/**
 * Appointment Service Utilities
 * Handles appointment-related helper functions
 */

import { getAvailableTimeSlotsWithBookedStatus } from "../../../services";



/**
 * Get available appointments for a given date and doctor
 * @param {string} doctorName - Doctor's name
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @param {array} bookedAppointments - List of booked appointments from context
 * @returns {array} Array of available time slots with booked status
 */
export const getAvailableAppointmentsForDate = (
  doctorName,
  dateString,
  bookedAppointments = []
) => {
  try {
    return getAvailableTimeSlotsWithBookedStatus(
      doctorName,
      dateString,
      bookedAppointments
    );
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};

/**
 * Validate appointment booking
 * @param {object} appointmentData - Appointment data to validate
 * @returns {object} Validation result { valid: boolean, error?: string }
 */
export const validateAppointmentBooking = (appointmentData) => {
  if (!appointmentData.selectedTime) {
    return { valid: false, error: "Please select a time slot" };
  }
  if (!appointmentData.selectedDate) {
    return { valid: false, error: "Please select a date" };
  }
  if (!appointmentData.doctor) {
    return { valid: false, error: "Doctor information missing" };
  }
  return { valid: true };
};
