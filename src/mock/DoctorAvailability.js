/**
 * Doctor Availability Module
 * Handles doctor scheduling and availability logic
 */

import { DOCTOR_AVAILABILITY, doctorsData } from "./data";
import { generateTimeSlots, getDayOfWeekInTimezone, formatTimeList, markBookedSlots } from "../utils/timeSlotUtils";

/**
 * Get available time slots for a doctor on a specific date
 * @param {string} doctorName - Name of the doctor
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {array} Array of available time slots
 */
export const getAvailableSlotsForDoctor = (doctorName, dateString) => {
  const doctor = DOCTOR_AVAILABILITY.find((d) => d.name === doctorName);
  if (!doctor) return [];

  const dayOfWeek = getDayOfWeekInTimezone(dateString, doctor.timezone);

  const daySchedules = doctor.schedule.filter(
    (s) => s.day_of_week === dayOfWeek
  );

  if (!daySchedules.length) return [];

  let allSlots = [];

  daySchedules.forEach((schedule) => {
    const slots = generateTimeSlots(
      schedule.available_at,
      schedule.available_until
    );
    allSlots = [...allSlots, ...slots];
  });

  return allSlots;
};

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
