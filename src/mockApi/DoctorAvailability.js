

import { doctorDataWithSchedule, doctorsData } from "./data";


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


export const getAllDoctors = () => {
  return doctorsData;
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
