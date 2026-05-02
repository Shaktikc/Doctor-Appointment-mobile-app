import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import Button from "./Button/Button";
import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { colors } from "./styles/Theme";
import { showTopMessage } from "./ErrorHandler";
import TimeSlot from "./TimeSlot";
// Mock data to replace API/database calls
const MOCK_TIMES = [
    { id: 1, apptime: "09:00" },
    { id: 2, apptime: "09:30" },
    { id: 3, apptime: "10:00" },
    { id: 4, apptime: "10:30" },
    { id: 5, apptime: "11:00" },
    { id: 6, apptime: "11:30" },
    { id: 7, apptime: "13:00" },
    { id: 8, apptime: "13:30" },
    { id: 9, apptime: "14:00" },
    { id: 10, apptime: "14:30" },
];

// Example of pre-booked appointments in the system (mock)
const MOCK_APPOINTMENTS = [
    {
        userId: "user1",
        serviceId: "1",
        appType: "Cardiology",
        bookedDate: moment().format("YYYY-MM-DD"),
        bookedTime: "09:00",
    },
];
import { Ionicons } from "@expo/vector-icons";


import userImages from "./utils/UserImageUtils";

// Fallback item when navigation params are missing
const DEFAULT_ITEM = {
    id: "1",
    firstName: "Demo",
    lastName: "Doctor",
    expert_area: "Genel",
    district: "—",
};

export default function BookAppointment({ route, navigation }) {
    const item = route?.params?.item ?? DEFAULT_ITEM;
    const serviceId = item.id;
    const scrollViewRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [timeList, setTimeList] = useState([]);
    const [serviceTimeList, setServiceTimeList] = useState([]);
    const [bookedApps, setBookedApps] = useState([]);

    const today = moment().format("YYYY-MM-DD");
    const threeMonthsLater = moment().add(3, "months").format("YYYY-MM-DD");

    // Mock user (no real auth)
    const user = { uid: "mock-user" };

    // Replace DB call with mock time list
    const getTimeListFromDatabase = async () => {
        setLoading(true);
        try {
            // simulate fetch delay
            await new Promise((res) => setTimeout(res, 200));
            setTimeList(MOCK_TIMES);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Compute booked slots from mock appointments and local state
    const getServiceAppointments = async (day) => {
        setLoading(true);
        setServiceTimeList([]);
        try {
            // gather mock + local booked apps
            const allBookings = [...MOCK_APPOINTMENTS, ...bookedApps];
            const serviceBookings = allBookings.filter(
                (app) => app.serviceId === serviceId && app.bookedDate === day
            );

            setBookedApps(serviceBookings);

            const availableTimes = timeList.map((time) => {
                const bookedHour = serviceBookings.some(
                    (app) => app.bookedTime === time.apptime
                );

                return {
                    ...time,
                    isBooked: !!bookedHour,
                };
            });

            setServiceTimeList(availableTimes);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            return true;
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            await getTimeListFromDatabase();
        };

        fetchData();
    }, [selectedDate]);

    const handleBooking = () => {
        if (selectedDate && selectedTime && user) {
            Alert.alert(
                "Randevu Oluşturma",
                "Randevunuz oluşturulacak, onaylıyor musunuz ?",
                [
                    {
                        text: "Vazgeç",
                        style: "cancel",
                    },
                    {
                        text: "Tamamla",
                        onPress: () => {
                            pushAppointment();
                        },
                    },
                ]
            );
        } else {
            if (!user) {
                showTopMessage("Kullanıcı girişi yapmadınız", "success");
                goToLoginScreen();
            } else if (!selectedDate || !selectedTime) {
                showTopMessage("Lütfen bir gün ve bir saat seçin.", "info");
            }
        }
    };

    // Simulate pushing appointment to backend by updating local state
    const pushAppointment = () => {
        const newApp = {
            userId: user.uid,
            serviceId: item.id,
            appType: item.expert_area,
            bookedDate: selectedDate,
            bookedTime: selectedTime,
        };

        // update local booked apps
        setBookedApps((prev) => [...prev, newApp]);

        showTopMessage("Randevunuz oluşturuldu!", "success");


        goToCompletedScreen();
        setSelectedTime(null);
        setSelectedDate(null);
    };

    const onDateSelect = async (day) => {
        try {
            setLoading(true);
            setSelectedDate(day.dateString);

            await getTimeListFromDatabase();
            await getServiceAppointments(day.dateString);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const goToCompletedScreen = () => {
        navigation.navigate("SearchScreen");
    };

    const goToLoginScreen = () => {
        navigation.navigate("LoginScreen");
    };

    return (
        <View style={styles.out_container}>
            <ScrollView
                nestedScrollEnabled={true}
                ref={scrollViewRef}
                style={styles.container}
                onContentSizeChange={(contentWidth, contentHeight) => {
                    if (!loading && scrollViewRef.current) {
                        scrollViewRef.current.scrollToEnd({ animated: true });
                    }
                }}
            >
                {/* Header */}
                <View style={styles.header_container}>
                    <Image
                        style={styles.image_container}
                        source={userImages[item.id]}
                    />
                    <View>
                        <View style={styles.title_container}>
                            <Text style={styles.title}>
                                {item.firstName} {item.lastName}
                            </Text>
                            <Text style={styles.about}>
                                {item.expert_area} Uzmanı
                            </Text>
                        </View>
                        <View style={styles.location_container}>
                            <Ionicons
                                name="ios-location-outline"
                                size={18}
                                color={colors.color_primary}
                            />
                            <Text style={styles.location}>{item.district}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.text_container}>
                    <Text style={styles.subTitle}>Gün Seçin:</Text>
                </View>

                <Calendar
                    style={styles.calendar_container}
                    onDayPress={!loading ? onDateSelect : undefined}
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedColor: colors.color_primary,
                            selectedTextColor: colors.color_white,
                        },
                    }}
                    customStyle={{
                        today: {
                            todayTextColor: colors.color_primary,
                        },
                    }}
                    minDate={today}
                    maxDate={threeMonthsLater}
                />

                {selectedDate && (
                    <View style={styles.bottom_container}>
                        {loading ? (
                            <ActivityIndicator
                                style={styles.loadingIndicator}
                            />
                        ) : (
                            <>
                                <View style={styles.text_container}>
                                    <Text style={styles.subTitle}>
                                        Saat Seçin:
                                    </Text>
                                </View>
                                <View style={styles.time_container}>
                                    {serviceTimeList.map((time) => (
                                        <TimeSlot
                                            key={time.id.toString()}
                                            time={time}
                                            onPress={onTimeSelect}
                                            isSelected={
                                                selectedTime === time.apptime
                                            }
                                            isBooked={time.isBooked}
                                        />
                                    ))}
                                </View>
                            </>
                        )}
                    </View>
                )}
            </ScrollView>
            <View style={styles.button_container}>
                <Button text={"Tamamla"} onPress={handleBooking} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    out_container: { flex: 1 },
    container: {
        flexGrow: 1,
        marginTop: 48,
        paddingHorizontal: 24,
    },
    header_container: {
        flexDirection: "row",
        backgroundColor: colors.color_white,
        marginTop: 36,
        padding: 16,
        borderRadius: 20,
    },

    calendar_container: {
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        justifyContent: "center",
    },

    image_container: {
        marginRight: 16,
        borderRadius: 50,
        overflow: "hidden",
        width: 100,
        height: 100,
    },
    title_container: {
        flex: 1,
    },
    location_container: { flexDirection: "row", paddingVertical: 8 },
    about_container: {
        flex: 1,
        justifyContent: "space-evenly",
    },
    text_container: {
        flex: 1,
        flexDirection: "row",
    },
    time_container: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 16,
        backgroundColor: colors.color_white,
        borderRadius: 20,
        justifyContent: "space-between",
    },
    bottom_container: {
        flex: 1,
        marginBottom: 24,
    },
    button_container: {
        flexDirection: "row",
        marginBottom: 126,
        paddingHorizontal: 24,
    },
    about: {
        fontSize: 20,
        fontFamily: "Mulish-Light",
    },

    title: {
        fontSize: 24,
        fontFamily: "Mulish-Medium",
    },
    subTitle: {
        fontSize: 18,
        paddingVertical: 16,
    },
    desc: {
        fontSize: 14,
        fontFamily: "Mulish-Light",
    },
    location: {
        fontSize: 16,
        fontFamily: "Mulish-Light",
        flex: 1,
        color: colors.color_primary,
        justifyContent: "center",
    },
});
