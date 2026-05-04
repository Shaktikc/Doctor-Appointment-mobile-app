/**
 * Doctor Availability Module
 * Handles doctor scheduling and availability logic
 */

import { doctorDataWithSchedule, doctorsData } from "./data";

/**
 * Generate time slots between two times with 30-minute intervals
 * @param {string} startTime - Time in HH:MM format (e.g., "09:00")
 * @param {string} endTime - Time in HH:MM format (e.g., "17:30")
 * @returns {array} Array of time strings in HH:MM format
 */
 const generateTimeSlots = (startTime, endTime) => {
  const slots = [];
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);

  let currentTime = startHour * 60 + startMin;
  const endTimeInMinutes = endHour * 60 + endMin;

  while (currentTime < endTimeInMinutes) {
    const hours = Math.floor(currentTime / 60);
    const minutes = currentTime % 60;
    slots.push(
      `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
    );
    currentTime += 30;
  }

  return slots;
};

/**
 * Get the day of week for a date in a specific timezone
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @param {string} timezone - Timezone string (e.g., "Australia/Sydney")
 * @returns {string} Day of week (Monday, Tuesday, etc.)
 */
 const getDayOfWeekInTimezone = (dateString, timezone) => {
  const date = new Date(dateString + "T00:00:00Z");
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: timezone,
  });
  return formatter.format(date);
};

/**
 * Format time list from database
 * @param {array} availableSlots - Array of available time slots
 * @returns {array} Formatted time list with id and apptime
 */
 const formatTimeList = (availableSlots) => {
  return availableSlots.map((time, index) => ({
    id: index + 1,
    apptime: time,
  }));
};

/**
 * Mark booked slots in a time list
 * @param {array} timeList - Array of time slots
 * @param {array} bookedAppointments - Array of booked appointments
 * @param {string} doctorName - Doctor's name
 * @param {string} appointmentDate - Date in YYYY-MM-DD format
 * @returns {array} Time list with isBooked flag
 */
 const markBookedSlots = (timeList, bookedAppointments, doctorName, appointmentDate) => {
  return timeList.map((time) => {
    const isBooked = bookedAppointments.some(
      (apt) =>
        apt.doctorName === doctorName &&
        apt.appointmentDate === appointmentDate &&
        apt.appointmentTime === time.apptime
    );
    return {
      ...time,
      isBooked,
    };
  });
};

/**
 * Get available time slots for a doctor on a specific date
 * @param {string} doctorName - Name of the doctor
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {array} Array of available time slots
 */
export const getAvailableSlotsForDoctor = (doctorName, dateString) => {
  const doctor = doctorDataWithSchedule.find((d) => d.name === doctorName);
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
