// Central exports for services
export {
  getAllDoctors,
  getDoctorById,
  getAvailableTimeSlotsForDoctor,
  getAvailableTimeSlotsWithBookedStatus,
} from "./doctorService";

export {
  validateAppointment,
  prepareAppointmentForBooking,
  cancelAppointmentFromList,
  getAppointmentsForDoctor,
  getUpcomingAppointments,
} from "./appointmentService";
