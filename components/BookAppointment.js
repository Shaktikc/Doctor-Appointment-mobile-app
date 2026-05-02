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
import { getAvailableSlotsForDoctor } from "../data/DoctorAvailability";

// // Example of pre-booked appointments in the system (mock)
// const MOCK_APPOINTMENTS = [
//     {
//         userId: "user1",
//         serviceId: "1",
//         appType: "Cardiology",
//         bookedDate: moment().format("YYYY-MM-DD"),
//         bookedTime: "09:00",
//     },
// ];
import { Ionicons } from "@expo/vector-icons";



export default function BookAppointment({ route, navigation }) {
    const doctor = route?.params?.doctor ;
    const serviceId = doctor.id;
    const scrollViewRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [timeList, setTimeList] = useState([]);
    const [serviceTimeList, setServiceTimeList] = useState([]);
    const [bookedApps, setBookedApps] = useState([]);

    const today = moment().format("YYYY-MM-DD");
    const threeMonthsLater = moment().add(3, "months").format("YYYY-MM-DD");

    // Get available time slots for the selected doctor on a specific date
    const getTimeListFromDatabase = async (doctorName, dateString) => {
        setLoading(true);
        try {
            // Simulate fetch delay
            await new Promise((res) => setTimeout(res, 200));
            
            // Get available slots for this doctor on this date
            const availableSlots = getAvailableSlotsForDoctor(doctorName, dateString);

            console.log(`Available slots for ${doctorName} on ${dateString}:`, availableSlots);
            
            // Convert to the expected format with id and apptime
            const formattedTimes = availableSlots.map((time, index) => ({
                id: index + 1,
                apptime: time,
            }));
            
            setTimeList(formattedTimes);
        } catch (error) {
            console.error(error);
            setTimeList([]);
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


    // Mock user (no real auth)
    const user = { uid: "mock-user" };

    useEffect(() => {
        const fetchData = async () => {
            if (selectedDate) {
                await getTimeListFromDatabase(doctor.name, selectedDate);
            }
        };

        fetchData();
    }, [selectedDate, doctor.name]);

    const handleBooking = () => {
        if (selectedDate && selectedTime && user) {
            Alert.alert(
                "Confirm Booking",
                "Your appointment will be created, are you sure?",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "Book",
                        onPress: () => {
                            pushAppointment();
                        },
                    },
                ]
            );
        } else {
            if (!user) {
                showTopMessage("You are not logged in", "success");
                goToLoginScreen();
            } else if (!selectedDate || !selectedTime) {
                showTopMessage("Please select a date and time.", "info");
            }
        }
    };

    // Simulate pushing appointment to backend by updating local state
    const pushAppointment = () => {
        const newApp = {
            userId: user.uid,
            serviceId: doctor.id,
            appType: doctor.categories[0],
            bookedDate: selectedDate,
            bookedTime: selectedTime,
        };

        // update local booked apps
        setBookedApps((prev) => [...prev, newApp]);

        showTopMessage("Your appointment has been created!", "success");


        goToCompletedScreen();
        setSelectedTime(null);
        setSelectedDate(null);
    };

    const onDateSelect = async (day) => {
        try {
            setLoading(true);
            setSelectedDate(day.dateString);

            await getTimeListFromDatabase(doctor.name, day.dateString);
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
                        source={{ uri: doctor.photo }}
                    />
                    <View>
                        <View style={styles.title_container}>
                            <Text style={styles.title}>
                                {doctor.name}
                            </Text>
                            <Text style={styles.about}>
                                {doctor.categories[0]} Specialist
                            </Text>
                        </View>
                        <View style={styles.location_container}>
                            <Ionicons
                                name="ios-location-outline"
                                size={18}
                                color={colors.color_primary}
                            />
                            <Text style={styles.location}>{doctor.location}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.text_container}>
                    <Text style={styles.subTitle}>Select Date:</Text>
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
                                        Select Time:
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
                <Button text={"Book"} onPress={handleBooking} />
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
