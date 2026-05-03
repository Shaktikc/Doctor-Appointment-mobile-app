/**
 * Appointment Services
 * Handles all appointment-related operations
 */

import { isSlotBooked, formatAppointmentData } from "../utils/appointmentUtils";

/**
 * Validate appointment data
 * @param {object} appointmentData - Appointment data to validate
 * @returns {object} Validation result { valid: boolean, error?: string }
 */
export const validateAppointment = (appointmentData) => {
  if (!appointmentData.doctorName) {
    return { valid: false, error: "Doctor name is required" };
  }
  if (!appointmentData.appointmentDate) {
    return { valid: false, error: "Appointment date is required" };
  }
  if (!appointmentData.appointmentTime) {
    return { valid: false, error: "Appointment time is required" };
  }
  return { valid: true };
};

/**
 * Check if appointment slot is available
 * @param {string} doctorName - Doctor's name
 * @param {string} appointmentDate - Date in YYYY-MM-DD format
 * @param {string} appointmentTime - Time in HH:MM format
 * @param {array} bookedAppointments - List of booked appointments
 * @returns {boolean} True if slot is available
 */


/**
 * Prepare appointment data for booking
 * @param {object} appointmentData - Raw appointment data
 * @returns {object} Formatted appointment data
 */
export const prepareAppointmentForBooking = (appointmentData) => {
  return formatAppointmentData(appointmentData);
};

/**
 * Cancel an appointment
 * @param {array} appointments - List of appointments
 * @param {string} appointmentId - ID of appointment to cancel
 * @returns {array} Updated appointments list
 */
export const cancelAppointmentFromList = (appointments, appointmentId) => {
  return appointments.filter((apt) => apt.id !== appointmentId);
};

/**
 * Get appointments for a specific doctor
 * @param {array} appointments - List of all appointments
 * @param {string} doctorName - Doctor's name
 * @returns {array} Appointments for the doctor
 */
export const getAppointmentsForDoctor = (appointments, doctorName) => {
  return appointments.filter((apt) => apt.doctorName === doctorName);
};

/**
 * Get upcoming appointments
 * @param {array} appointments - List of appointments
 * @returns {array} Upcoming appointments sorted by date
 */
export const getUpcomingAppointments = (appointments) => {
  const today = new Date().toISOString().split("T")[0];
  return appointments
    .filter((apt) => apt.appointmentDate >= today)
    .sort((a, b) => {
      const dateCompare = new Date(a.appointmentDate) - new Date(b.appointmentDate);
      if (dateCompare !== 0) return dateCompare;
      return a.appointmentTime.localeCompare(b.appointmentTime);
    });
};

export default {
  validateAppointment,

  prepareAppointmentForBooking,
  cancelAppointmentFromList,
  getAppointmentsForDoctor,
  getUpcomingAppointments,
};
