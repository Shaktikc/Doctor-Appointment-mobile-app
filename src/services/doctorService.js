/**
 * Doctor Services
 * Handles all doctor-related API calls and data retrieval
 */

import { doctorsData } from "../data/data";
import { getAvailableSlotsForDoctor } from "../data/DoctorAvailability";
import { formatTimeList, markBookedSlots } from "../utils/timeSlotUtils";

/**
 * Get all doctors
 * @returns {array} List of all doctors
 */
export const getAllDoctors = () => {
  return doctorsData;
};

/**
 * Get a doctor by ID
 * @param {string} doctorId - Doctor's ID
 * @returns {object} Doctor object
 */
export const getDoctorById = (doctorId) => {
  return doctorsData.find((doctor) => doctor.id === doctorId);
};

/**
 * Get available time slots for a doctor on a specific date
 * @param {string} doctorName - Doctor's name
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {array} Available time slots
 */
export const getAvailableTimeSlotsForDoctor = (doctorName, dateString) => {
  try {
    const availableSlots = getAvailableSlotsForDoctor(doctorName, dateString);
    return formatTimeList(availableSlots);
  } catch (error) {
    console.error("Error fetching available time slots:", error);
    return [];
  }
};

/**
 * Get available time slots with booked status
 * @param {string} doctorName - Doctor's name
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @param {array} bookedAppointments - List of booked appointments
 * @returns {array} Time slots with booked status
 */
export const getAvailableTimeSlotsWithBookedStatus = (
  doctorName,
  dateString,
  bookedAppointments = []
) => {
  try {
    const availableSlots = getAvailableSlotsForDoctor(doctorName, dateString);
    const formattedSlots = formatTimeList(availableSlots);
    return markBookedSlots(formattedSlots, bookedAppointments, doctorName, dateString);
  } catch (error) {
    console.error("Error fetching time slots with booked status:", error);
    return [];
  }
};

export default {
  getAllDoctors,
  getDoctorById,
  getAvailableTimeSlotsForDoctor,
  getAvailableTimeSlotsWithBookedStatus,
};
