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

import React, { createContext, useCallback, useState } from "react";
import { isSlotBooked, formatAppointmentData } from "../utils/appointmentUtils";

const BookAppointmentContext = createContext();

export const BookAppointmentProvider = ({ children }) => {
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [bookedAppointments, setBookedAppointments] = useState([]);

  /**
   * Save a single appointment and add to booked appointments list
   * @param {object} appointmentData - Appointment data including doctorName, date, time, etc.
   */
  const saveAppointment = useCallback((appointmentData) => {
    setBookedAppointment(appointmentData);
    addBookedAppointment(appointmentData);
  }, []);

  /**
   * Add appointment to the list of booked appointments
   * Prevents double-booking by checking doctor + date + time combination
   * @param {object} appointment - Appointment details
   * @returns {boolean} True if added successfully, false if already booked
   */
  const addBookedAppointment = useCallback((appointment) => {
    // Create a unique key for this appointment: doctorName + date + time
    const appointmentKey = `${appointment.doctorName}|${appointment.appointmentDate}|${appointment.appointmentTime}`;

    // Check if this slot is already booked
    setBookedAppointments((prevAppointments) => {
      const isDoubleBooked = prevAppointments.some((apt) => {
        const existingKey = `${apt.doctorName}|${apt.appointmentDate}|${apt.appointmentTime}`;
        return existingKey === appointmentKey;
      });

      if (isDoubleBooked) {
        console.warn("This time slot is already booked!");
        return prevAppointments;
      }

      // Add the appointment with a unique ID
      const newAppointment = formatAppointmentData(appointment);
      return [...prevAppointments, newAppointment];
    });
  }, []);

  /**
   * Check if a specific doctor/date/time slot is already booked
   * @param {string} doctorName - Doctor's name
   * @param {string} date - Date in YYYY-MM-DD format
   * @param {string} time - Time in HH:MM format
   * @returns {boolean} True if slot is booked, false otherwise
   */
  const checkSlotBooked = useCallback(
    (doctorName, date, time) => {
      return isSlotBooked(bookedAppointments, doctorName, date, time);
    },
    [bookedAppointments]
  );

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

  const value = {
    bookedAppointment,
    bookedAppointments,
    saveAppointment,
    clearAppointment,
    cancelAppointment,
    isSlotBooked: checkSlotBooked,
    addBookedAppointment,
  };

  return (
    <BookAppointmentContext.Provider value={value}>
      {children}
    </BookAppointmentContext.Provider>
  );
};

export default BookAppointmentContext;
