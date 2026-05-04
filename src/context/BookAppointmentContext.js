/**
 * BookAppointmentContext
 * Manages appointment booking state and operations
 * 
 * Time Zone Documentation:
 * - All appointments are stored with their doctor's timezone as defined in DoctorAvailability.js
 * - Booking timestamps are in ISO 8601 format with timezone info
 * - The system assumes doctors' schedules are defined in their local timezone
 * - Appointments are booked in the doctor's local timezone, not the user's
 */

import React, { createContext, useCallback, useState, useMemo } from "react";

const BookAppointmentContext = createContext();

export const BookAppointmentProvider = ({ children }) => {
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [bookedAppointments, setBookedAppointments] = useState([]);

  /**
   * Check if a specific doctor/date/time slot is already booked
   * @param {string} doctorName - Doctor's name
   * @param {string} date - Date in YYYY-MM-DD format
   * @param {string} time - Time in HH:MM format
   * @returns {boolean} True if slot is booked, false otherwise
   */
  const isSlotBooked = useCallback(
    (doctorName, date, time) => {
      return bookedAppointments.some(
        (apt) =>
          apt.doctorName === doctorName &&
          apt.appointmentDate === date &&
          apt.appointmentTime === time
      );
    },
    [bookedAppointments]
  );

  /**
   * Save a single appointment and add to booked appointments list
   * @param {object} appointmentData - Appointment data including doctorName, date, time, etc.
   */
  const saveAppointment = useCallback((appointmentData) => {
    // Create appointment key to check for double-booking
    const appointmentKey = `${appointmentData.doctorName}|${appointmentData.appointmentDate}|${appointmentData.appointmentTime}`;

    setBookedAppointments((prevAppointments) => {
      // Check if slot is already booked
      const isAlreadyBooked = prevAppointments.some(
        (apt) =>
          `${apt.doctorName}|${apt.appointmentDate}|${apt.appointmentTime}` === appointmentKey
      );

      if (isAlreadyBooked) {
        console.warn("This time slot is already booked!");
        return prevAppointments;
      }

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

  /**
   * Clear the current appointment
   */
  const clearAppointment = useCallback(() => {
    setBookedAppointment(null);
  }, []);

  /**
   * Cancel a booked appointment
   * @param {string} appointmentId - ID of the appointment to cancel
   */
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
