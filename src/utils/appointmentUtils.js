/**
 * Appointment utilities for managing appointment logic
 */

/**
 * Create a unique key for an appointment
 * @param {string} doctorName - Doctor's name
 * @param {string} appointmentDate - Date in YYYY-MM-DD format
 * @param {string} appointmentTime - Time in HH:MM format
 * @returns {string} Unique appointment key
 */
export const createAppointmentKey = (doctorName, appointmentDate, appointmentTime) => {
  return `${doctorName}|${appointmentDate}|${appointmentTime}`;
};

/**
 * Check if a slot is already booked in the appointments list
 * @param {array} bookedAppointments - Array of booked appointments
 * @param {string} doctorName - Doctor's name
 * @param {string} appointmentDate - Date in YYYY-MM-DD format
 * @param {string} appointmentTime - Time in HH:MM format
 * @returns {boolean} True if slot is booked
 */
export const isSlotBooked = (bookedAppointments, doctorName, appointmentDate, appointmentTime) => {
  return bookedAppointments.some(
    (apt) =>
      apt.doctorName === doctorName &&
      apt.appointmentDate === appointmentDate &&
      apt.appointmentTime === appointmentTime
  );
};

/**
 * Format appointment data with additional fields
 * @param {object} appointmentData - Base appointment data
 * @returns {object} Formatted appointment with metadata
 */
export const formatAppointmentData = (appointmentData) => {
  return {
    ...appointmentData,
    id: Date.now().toString(),
    bookingTimestamp: new Date().toISOString(),
  };
};
