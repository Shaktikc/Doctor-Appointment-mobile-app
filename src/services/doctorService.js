/**
 * Doctor Services
 * Handles doctor-related operations and appointment availability
 */

import { doctorsData } from "../mockApi/data";
import { getAvailableSlotsForDoctor } from "../mockApi/DoctorAvailability";
import { formatTimeList, markBookedSlots } from "../utils/timeSlotUtils";

/**
 * Get all doctors
 * @returns {array} List of all doctors
 */
export const getAllDoctors = () => {
  return doctorsData;
};

/**
 * Get available time slots with booked status for a doctor
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
