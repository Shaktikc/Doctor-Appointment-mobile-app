/**
 * Time Zone Documentation:
 * - All appointments are stored with their doctor's timezone as defined in DoctorAvailability.js
 */

import React, { createContext, useCallback, useState, useMemo, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookAppointmentContext = createContext();

const BOOKINGS_KEY = "bookings";

export const BookAppointmentProvider = ({ children }) => {
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Persist bookings to AsyncStorage (memoized)
  const persistBookingsToStorage = useCallback(async (appointments) => {
    try {
      await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(appointments));
      console.log(" Bookings persisted to AsyncStorage");
    } catch (error) {
      console.error("Failed to persist bookings:", error);
    }
  }, []);

  // Load bookings from AsyncStorage (memoized and defined before useEffect)
  const loadBookingsFromStorage = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedBookings = await AsyncStorage.getItem(BOOKINGS_KEY);
      if (storedBookings) {
        const parsedBookings = JSON.parse(storedBookings);
        setBookedAppointments(parsedBookings);
        console.log(" Loaded", parsedBookings.length, "bookings from AsyncStorage");
      }
    } catch (error) {
      console.error(" Failed to load bookings from AsyncStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load bookings on mount
  useEffect(() => {
    loadBookingsFromStorage();
  }, [loadBookingsFromStorage]);


    const isSlotBooked = useCallback(
    (doctorName,date = null, time = null) => {
      return bookedAppointments.some(
        (apt) =>
          apt.doctorName === doctorName ||
          apt.appointmentDate === date &&
          apt.appointmentTime === time
      );
    },
    [bookedAppointments]
  );

  // const isSlotBooked = useCallback(
  //   (doctorName, date, time) => {
  //     return bookedAppointments.some(
  //       (apt) =>
  //         apt.doctorName === doctorName &&
  //         apt.appointmentDate === date &&
  //         apt.appointmentTime === time
  //     );
  //   },
  //   [bookedAppointments]
  // );


  const saveAppointment = useCallback((appointmentData) => {
    // Create appointment key to check for double-booking
    const appointmentKey = `${appointmentData.doctorName}|${appointmentData.appointmentDate}|${appointmentData.appointmentTime}`;

    setBookedAppointments((prevAppointments) => {
      // Create new appointment with metadata
      const newAppointment = {
        ...appointmentData,
        id: appointmentData.id || Date.now().toString(),
        bookingTimestamp: appointmentData.bookingTimestamp || new Date().toISOString(),
      };

      const updatedAppointments = [...prevAppointments, newAppointment];
      
      // Persist to AsyncStorage
      persistBookingsToStorage(updatedAppointments);
      
      setBookedAppointment(newAppointment);
      return updatedAppointments;
    });
  }, []);

  const clearAppointment = useCallback(() => {
    setBookedAppointment(null);
  }, []);


  const cancelAppointment = useCallback((appointmentId) => {
    setBookedAppointments((prevAppointments) => {
      const updatedAppointments = prevAppointments.filter((apt) => apt.id !== appointmentId);
      
      // Persist to AsyncStorage
      persistBookingsToStorage(updatedAppointments);
      
      return updatedAppointments;
    });
    
    setBookedAppointment((current) =>
      current?.id === appointmentId ? null : current
    );
  }, []);

  const value = useMemo(
    () => ({
      bookedAppointment,
      bookedAppointments,
      saveAppointment,
      clearAppointment,
      cancelAppointment,
      isSlotBooked,
      isLoading,
      loadBookingsFromStorage,
    }),
    [bookedAppointment, bookedAppointments, isLoading, saveAppointment, clearAppointment, cancelAppointment, isSlotBooked, loadBookingsFromStorage]
  );

  return (
    <BookAppointmentContext.Provider value={value}>
      {children}
    </BookAppointmentContext.Provider>
  );
};

export default BookAppointmentContext;
