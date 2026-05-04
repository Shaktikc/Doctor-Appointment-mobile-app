

import { doctorDataWithSchedule } from "./data";


 const getDayOfWeekInTimezone = (dateString, timezone) => {
  const date = new Date(dateString + "T00:00:00Z");
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: timezone,
  });
  return formatter.format(date);
};


 const formatTimeList = (availableSlots) => {
  return availableSlots.map((time, index) => ({
    id: index + 1,
    apptime: time,
  }));
};


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
 * Generate time slots between two times (30-minute intervals)
 * @param {string} startTime - Start time in "HH:MM" format
 * @param {string} endTime - End time in "HH:MM" format
 * @returns {string[]} Array of time slots in "HH:MM" format
 */
const generateTimeSlots = (startTime, endTime) => {
  const slots = [];
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  let currentHour = startHour;
  let currentMinute = startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  while (currentHour * 60 + currentMinute < endTotalMinutes) {
    const timeString = `${String(currentHour).padStart(2, "0")}:${String(
      currentMinute
    ).padStart(2, "0")}`;
    slots.push(timeString);

    // Add 30-minute interval
    currentMinute += 30;
    if (currentMinute >= 60) {
      currentMinute -= 60;
      currentHour += 1;
    }
  }

  return slots;
};


 const getAvailableSlotsForDoctor = (doctorName, dateString) => {
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
