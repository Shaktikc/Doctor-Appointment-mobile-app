import { DOCTOR_AVAILABILITY } from "./data";

/**
 * Generate time slots between two times with 30-minute intervals
 * @param {string} startTime - Time in HH:MM format (e.g., "09:00")
 * @param {string} endTime - Time in HH:MM format (e.g., "17:30")
 * @returns {array} Array of time strings in HH:MM format
 */
export const generateTimeSlots = (startTime, endTime) => {
    const slots = [];
    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);

    let currentTime = startHour * 60 + startMin; // Convert to minutes
    const endTimeInMinutes = endHour * 60 + endMin;

    while (currentTime < endTimeInMinutes) {
        const hours = Math.floor(currentTime / 60);
        const minutes = currentTime % 60;
        slots.push(
            `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
        );
        currentTime += 30; // 30-minute intervals
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
    // Create a date object from the date string
    const date = new Date(dateString + "T00:00:00Z");
    
    // Get the day of week in the specified timezone
    const formatter = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        timeZone: timezone,
    });
    
    return formatter.format(date);
};

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

