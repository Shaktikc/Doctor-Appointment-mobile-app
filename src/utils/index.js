// Central exports for utilities
export { getRandomUserImage } from "./imageUtils";
export { isSlotBooked, createAppointmentKey, formatAppointmentData } from "./appointmentUtils";
export {
  generateTimeSlots,
  getDayOfWeekInTimezone,
  formatTimeList,
  markBookedSlots,
} from "../mockApi/DoctorAvailability";
export {
  showErrorMessage,
  showSuccessMessage,
  showWarningMessage,
  showTopMessage,
} from "./errorHandler";
