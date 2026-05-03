// AuthContext.js
/**
 * Time Zone Documentation:
 * - All appointments are stored with their doctor's timezone as defined in DoctorAvailability.js
 * - Booking timestamps are in ISO 8601 format with timezone info
 * - The system assumes doctors' schedules are defined in their local timezone
 * - Appointments are booked in the doctor's local timezone, not the user's
 */

import React, { createContext, useContext, useState } from 'react';

const BookAppointmentContext = createContext();

export const BookAppointmentProvider = ({ children }) => {

  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [bookedAppointments, setBookedAppointments] = useState([]);


  /**
   * Save a single appointment and add to booked appointments list
   * @param {object} appointmentData - Appointment data including doctorName, date, time, etc.
   */
  const saveAppointment = (appointmentData) => {
    setBookedAppointment(appointmentData);
    addBookedAppointment(appointmentData);
  };

  /**
   * Add appointment to the list of booked appointments
   * Prevents double-booking by checking doctor + date + time combination
   * @param {object} appointment - Appointment details
   */
  const addBookedAppointment = (appointment) => {
    // Create a unique key for this appointment: doctorName + date + time
    const appointmentKey = `${appointment.doctorName}|${appointment.appointmentDate}|${appointment.appointmentTime}`;
    
    // Check if this slot is already booked
    const isDoubleBooked = bookedAppointments.some(
      (apt) => {
        const existingKey = `${apt.doctorName}|${apt.appointmentDate}|${apt.appointmentTime}`;
        return existingKey === appointmentKey;
      }
    );

    if (isDoubleBooked) {
      console.warn('This time slot is already booked!');
      return false;
    }

    // Add the appointment with a unique ID
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(),
      bookingTimestamp: new Date().toISOString(),
    };

    setBookedAppointments([...bookedAppointments, newAppointment]);
    return true;
  };

  /**
   * Check if a specific doctor/date/time slot is already booked
   * @param {string} doctorName - Doctor's name
   * @param {string} date - Date in YYYY-MM-DD format
   * @param {string} time - Time in HH:MM format
   * @returns {boolean} True if slot is booked, false otherwise
   */
  const isSlotBooked = (doctorName, date, time) => {
    return bookedAppointments.some(
      (apt) => apt.doctorName === doctorName && apt.appointmentDate === date && apt.appointmentTime === time
    );
  };

  const clearAppointment = () => {
    setBookedAppointment(null);
  };

  /**
   * Cancel a booked appointment
   * @param {string} appointmentId - ID of the appointment to cancel
   */
  const cancelAppointment = (appointmentId) => {
    setBookedAppointments(bookedAppointments.filter(apt => apt.id !== appointmentId));
    if (bookedAppointment?.id === appointmentId) {
      setBookedAppointment(null);
    }
  };

  return (
    <BookAppointmentContext.Provider 
      value={{ 
        bookedAppointment,
        bookedAppointments,
        saveAppointment,
        clearAppointment,
        cancelAppointment,
        isSlotBooked,
        addBookedAppointment,
      }}
    >
      {children}
    </BookAppointmentContext.Provider>
  );
};

export const useBookAppointment = () => {
  return useContext(BookAppointmentContext);
};
