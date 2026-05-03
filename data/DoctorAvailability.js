/**
 * Doctor Availability & Booking System
 * 
 * BOOKING RULES:
 * 1. Each doctor's schedule defines available time windows (days + start/end times)
 * 2. Available windows are converted into 30-minute slots automatically
 * 3. Booked slots are persisted in AuthContext and unavailable in the UI
 * 4. Double-booking prevention: Same doctor/date/time combo can only be booked once
 * 5. When a slot is booked, it's immediately marked as unavailable for other users
 * 
 * TIME ZONE DOCUMENTATION:
 * - Each doctor has a designated timezone (e.g., "Australia/Sydney")
 * - Doctor's working hours are defined in their LOCAL timezone
 * - When fetching available slots for a date, the system:
 *   a) Converts the requested date to the doctor's timezone
 *   b) Determines the day of week in that timezone
 *   c) Retrieves schedules matching that day
 *   d) Generates 30-minute slots within those hours
 * - Appointment bookings are stored with the doctor's timezone reference
 * - No conversion is applied - all times are in the doctor's local timezone
 * 
 * SLOT GENERATION:
 * - 30-minute intervals: slots start at :00 and :30 minutes
 * - Example: 09:00-11:00 generates [09:00, 09:30, 10:00, 10:30]
 * - End time is NOT included as a slot (used as boundary only)
 * 
 * PERSISTENCE:
 * - Booked appointments are stored in React Context (bookedAppointments array)
 * - Each appointment has unique identifier: doctorName | appointmentDate | appointmentTime
 * - Future enhancement: Add AsyncStorage for persistent storage across app restarts
 */

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

    return allSlots;
};

