// Doctor availability data by name, timezone, day of week, and time slots
const DOCTOR_AVAILABILITY = [
    {
        name: "Christy Schumm",
        timezone: "Australia/Sydney",
        schedule: [
            { day_of_week: "Monday", available_at: "09:00", available_until: "17:30" },
            { day_of_week: "Tuesday", available_at: "08:00", available_until: "16:00" },
            { day_of_week: "Thursday", available_at: "09:00", available_until: "16:00" },
            { day_of_week: "Friday", available_at: "07:00", available_until: "14:00" },
        ],
    },
    {
        name: "Natalia Stanton Jr.",
        timezone: "Australia/Perth",
        schedule: [
            { day_of_week: "Tuesday", available_at: "08:00", available_until: "10:00" },
            { day_of_week: "Wednesday", available_at: "11:00", available_until: "18:00" },
            { day_of_week: "Saturday", available_at: "09:00", available_until: "15:00" },
            { day_of_week: "Sunday", available_at: "08:00", available_until: "15:00" },
        ],
    },
    {
        name: "Nola Murazik V",
        timezone: "Australia/Darwin",
        schedule: [
            { day_of_week: "Monday", available_at: "08:00", available_until: "10:00" },
            { day_of_week: "Tuesday", available_at: "11:00", available_until: "13:00" },
            { day_of_week: "Wednesday", available_at: "08:00", available_until: "10:00" },
            { day_of_week: "Saturday", available_at: "08:00", available_until: "11:00" },
            { day_of_week: "Sunday", available_at: "07:00", available_until: "09:00" },
        ],
    },
    {
        name: "Elyssa O'Kon",
        timezone: "Australia/Perth",
        schedule: [
            { day_of_week: "Monday", available_at: "09:00", available_until: "15:00" },
            { day_of_week: "Tuesday", available_at: "06:00", available_until: "13:00" },
            { day_of_week: "Wednesday", available_at: "06:00", available_until: "11:00" },
            { day_of_week: "Friday", available_at: "08:00", available_until: "12:00" },
            { day_of_week: "Saturday", available_at: "09:00", available_until: "16:00" },
            { day_of_week: "Sunday", available_at: "08:00", available_until: "10:00" },
        ],
    },
    {
        name: "Dr. Geovany Keebler",
        timezone: "Australia/Perth",
        schedule: [
            { day_of_week: "Thursday", available_at: "07:00", available_until: "14:00" },
            { day_of_week: "Thursday", available_at: "15:00", available_until: "17:00" },
        ],
    },
    {
        name: "Ramy Malik",
        timezone: "Australia/Perth",
        schedule: [
            { day_of_week: "Monday", available_at: "09:00", available_until: "15:00" },
            { day_of_week: "Tuesday", available_at: "06:00", available_until: "13:00" },
            { day_of_week: "Wednesday", available_at: "06:00", available_until: "11:00" },
            { day_of_week: "Friday", available_at: "08:00", available_until: "12:00" },
        ],
    },
];

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
console.log(`Generated slots for ${doctorName} on ${dateString} (${dayOfWeek}):`, allSlots, "khj;lkj;lkjlk");
    return allSlots;
};

/**
 * Get doctor availability info by name
 * @param {string} doctorName - Name of the doctor
 * @returns {object} Doctor availability object or null
 */
export const getDoctorAvailability = (doctorName) => {
    return DOCTOR_AVAILABILITY.find((d) => d.name === doctorName) || null;
};

export default DOCTOR_AVAILABILITY;