/**
 * Time Zone Documentation:
 * - All appointments are stored with their doctor's timezone as defined in DoctorAvailability.js
 */

import React, { createContext, useCallback, useState, useMemo } from "react";

const BookAppointmentContext = createContext();

export const BookAppointmentProvider = ({ children }) => {
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [bookedAppointments, setBookedAppointments] = useState([]);


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
      // // Check if slot is already booked
      // const isAlreadyBooked = prevAppointments.some(
      //   (apt) =>
      //     `${apt.doctorName}|${apt.appointmentDate}|${apt.appointmentTime}` === appointmentKey
      // );

      // if (isAlreadyBooked) {
      //   console.warn("This time slot is already booked!");
      //   return prevAppointments;
      // }

      // Create new appointment with metadata
      const newAppointment = {
        ...appointmentData,
        id: Date.now().toString(),
        bookingTimestamp: new Date().toISOString(),
      };

      const updatedAppointments = [...prevAppointments, newAppointment];
      setBookedAppointment(newAppointment);
      return updatedAppointments;
    });
  }, []);

  const clearAppointment = useCallback(() => {
    setBookedAppointment(null);
  }, []);


  const cancelAppointment = useCallback((appointmentId) => {
    setBookedAppointments((prevAppointments) =>
      prevAppointments.filter((apt) => apt.id !== appointmentId)
    );
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
    }),
    [bookedAppointment, bookedAppointments, saveAppointment, clearAppointment, cancelAppointment, isSlotBooked]
  );

  return (
    <BookAppointmentContext.Provider value={value}>
      {children}
    </BookAppointmentContext.Provider>
  );
};

export default BookAppointmentContext;
