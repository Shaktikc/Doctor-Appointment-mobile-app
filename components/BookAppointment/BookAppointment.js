import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    ActivityIndicator,
    Alert,
} from "react-native";
import Button from "../Button/Button";
import React, { useState, useRef } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { colors } from "../styles/Theme";
import TimeSlot from "../TimeSlot";
import { getAvailableSlotsForDoctor } from "../../data/DoctorAvailability";
import { Ionicons } from "@expo/vector-icons";
import { getTimeListFromDatabase } from "./utils/getTimeListFromDatabase";
import { getServiceAppointments } from "./utils/getServiceAppointments";
import { useAuth } from "../../AuthContext";

export default function BookAppointment({ route, navigation }) {
    const doctor = route?.params?.doctor;
    const serviceId = doctor.id;
    const scrollViewRef = useRef(null);
    const { saveAppointment, bookedAppointments, isSlotBooked } = useAuth();

    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const [serviceTimeList, setServiceTimeList] = useState([]);

    const today = moment().format("YYYY-MM-DD");
    const threeMonthsLater = moment().add(3, "months").format("YYYY-MM-DD");


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

            

            await getServiceAppointments(
                day.dateString,
                timeListData,
                doctor.name,
                setServiceTimeList,
                bookedAppointments
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onTimeSelect = (time) => {
        setSelectedTime(time);
        // // Save appointment to context
        // const appointmentData = {
        //     doctorName: doctor.name,
        //     doctorPhoto: doctor.photo,
        //     specialization: doctor.categories[0],
        //     location: doctor.location,
        //     appointmentDate: selectedDate,
        //     appointmentTime: time,
        //     bookedDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        // };
        // saveAppointment(appointmentData);
    };

    const onBook = () => {
        if (!selectedTime) {
            Alert.alert("Error", "Please select a time slot before booking");
            return;
        }

        // Check for double-booking
        if (isSlotBooked(doctor.name, selectedDate, selectedTime)) {
            Alert.alert(
                "Slot Unavailable",
                "Sorry, this time slot has just been booked by another user. Please select a different time.",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            setSelectedTime(null);
                        },
                    },
                ]
            );
            return;
        }

        Alert.alert(
            "Confirm Booking",
            `Are you sure you want to book this appointment?\n\nDoctor: ${doctor.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`,
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        // Do nothing on cancel
                    },
                    style: "cancel",
                },
                {
                    text: "Book",
                    onPress: () => {
                        // Final double-check before booking
                        if (isSlotBooked(doctor.name, selectedDate, selectedTime)) {
                            Alert.alert(
                                "Booking Failed",
                                "This slot was just booked. Please try another time."
                            );
                            return;
                        }

                        // Save appointment to context
                        const appointmentData = {
                            doctorName: doctor.name,
                            doctorPhoto: doctor.photo,
                            specialization: doctor.categories[0],
                            location: doctor.location,
                            appointmentDate: selectedDate,
                            appointmentTime: selectedTime,
                            bookedDate: moment().format("YYYY-MM-DD HH:mm:ss"),
                        };
                        
                        const bookingSuccess = saveAppointment(appointmentData);

                        if (bookingSuccess === false) {
                            Alert.alert(
                                "Booking Failed",
                                "Could not complete booking. This slot may have been taken."
                            );
                            return;
                        }

                        Alert.alert(
                            "Success",
                            "Your appointment has been booked successfully!",
                            [
                                {
                                    text: "OK",
                                    onPress: () => {
                                        navigation.navigate("Profile");
                                    },
                                },
                            ]
                        );
                    },
                    style: "default",
                },
            ]
        );
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

                                {serviceTimeList.length === 0 ? (
                                    <View
                                        style={styles.no_slots_container}
                                    >
                                        <Text
                                            style={styles.no_slots_message}
                                        >
                                            Doctor is not available on this day, please select a different day
                                        </Text>
                                    </View>
                                ) : (
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
                                )}
                            </>
                        )}
                    </View>
                )}
            </ScrollView>
              <View style={styles.button_container}>
                <Button text={"Book"} onPress={onBook} />
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
        button_container: {
        flexDirection: "row",
        marginBottom: 126,
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
    
    },
    title: {
        fontSize: 24,
  
    },
    subTitle: {
        fontSize: 18,
        paddingVertical: 16,
    },
    location: {
        fontSize: 16,
   
        flex: 1,
        color: colors.color_primary,
    },
    no_slots_container: {
        padding: 16,
        backgroundColor: colors.color_white,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        minHeight: 100,
    },
    no_slots_message: {
        fontSize: 16,
        color: colors.color_primary,
        textAlign: "center",
    },
});