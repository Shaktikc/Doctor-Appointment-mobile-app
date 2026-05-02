import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import Button from "./Button/Button";
import React, { useState, useRef } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { colors } from "./styles/Theme";
import TimeSlot from "./TimeSlot";
import { getAvailableSlotsForDoctor } from "../data/DoctorAvailability";
import { Ionicons } from "@expo/vector-icons";

// Mock bookings (replace with real data if needed)
const bookedApps = [];

export default function BookAppointment({ route, navigation }) {
    const doctor = route?.params?.doctor;
    const serviceId = doctor.id;
    const scrollViewRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [timeList, setTimeList] = useState([]);
    const [serviceTimeList, setServiceTimeList] = useState([]);

    const today = moment().format("YYYY-MM-DD");
    const threeMonthsLater = moment().add(3, "months").format("YYYY-MM-DD");

    //  Get available time slots (returns data instead of relying on state)
    const getTimeListFromDatabase = async (doctorName, dateString) => {
        try {
            // await new Promise((res) => setTimeout(res, 200));

            const availableSlots = getAvailableSlotsForDoctor(
                doctorName,
                dateString
            );

            const formattedTimes = availableSlots.map((time, index) => ({
                id: index + 1,
                apptime: time,
            }));

            return formattedTimes;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    //  Compute booked slots using passed data
    const getServiceAppointments = async (day, timeListData) => {
        try {
            const allBookings = [...bookedApps];

            const serviceBookings = allBookings.filter(
                (app) =>
                    app.serviceId === serviceId &&
                    app.bookedDate === day
            );

            const availableTimes = timeListData.map((time) => {
                const bookedHour = serviceBookings.some(
                    (app) => app.bookedTime === time.apptime
                );

                return {
                    ...time,
                    isBooked: bookedHour,
                };
            });

            setServiceTimeList(availableTimes);
        } catch (error) {
            console.error(error);
        }
    };

    // Mock user
    const user = { uid: "mock-user" };

    //  Single controlled execution
    const onDateSelect = async (day) => {
        try {
            setLoading(true);
            setSelectedDate(day.dateString);
            setSelectedTime(null);

            const timeListData = await getTimeListFromDatabase(
                doctor.name,
                day.dateString
            );

            setTimeList(timeListData);

            await getServiceAppointments(
                day.dateString,
                timeListData
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onTimeSelect = (time) => {
        setSelectedTime(time);
    };

    return (
        <View style={styles.out_container}>
            <ScrollView
                nestedScrollEnabled={true}
                ref={scrollViewRef}
                style={styles.container}
                onContentSizeChange={() => {
                    if (!loading && scrollViewRef.current) {
                        scrollViewRef.current.scrollToEnd({
                            animated: true,
                        });
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
                            <Text style={styles.location}>
                                {doctor.location}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Calendar */}
                <View style={styles.text_container}>
                    <Text style={styles.subTitle}>
                        Select Date:
                    </Text>
                </View>

                <Calendar
                    style={styles.calendar_container}
                    onDayPress={!loading ? onDateSelect : undefined}
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedColor: colors.color_primary,
                            selectedTextColor:
                                colors.color_white,
                        },
                    }}
                    minDate={today}
                    maxDate={threeMonthsLater}
                />

                {/* Time Slots */}
                {selectedDate && (
                    <View style={styles.bottom_container}>
                        {loading ? (
                            <ActivityIndicator
                                style={styles.loadingIndicator}
                            />
                        ) : (
                            <>
                                <View
                                    style={styles.text_container}
                                >
                                    <Text
                                        style={styles.subTitle}
                                    >
                                        Select Time:
                                    </Text>
                                </View>

                                <View
                                    style={styles.time_container}
                                >
                                    {serviceTimeList.map(
                                        (time) => (
                                            <TimeSlot
                                                key={time.id.toString()}
                                                time={time}
                                                onPress={
                                                    onTimeSelect
                                                }
                                                isSelected={
                                                    selectedTime ===
                                                    time.apptime
                                                }
                                                isBooked={
                                                    time.isBooked
                                                }
                                            />
                                        )
                                    )}
                                </View>
                            </>
                        )}
                    </View>
                )}
            </ScrollView>
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
    location_container: {
        flexDirection: "row",
        paddingVertical: 8,
    },
    text_container: {
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
        marginBottom: 24,
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
    location: {
        fontSize: 16,
        fontFamily: "Mulish-Light",
        flex: 1,
        color: colors.color_primary,
    },
});