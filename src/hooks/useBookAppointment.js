/**
 * useBookAppointment Hook
 * Custom hook to access BookAppointmentContext
 */

import { useContext } from "react";
import BookAppointmentContext from "../context/BookAppointmentContext";

export const useBookAppointment = () => {
  const context = useContext(BookAppointmentContext);
  
  if (!context) {
    throw new Error(
      "useBookAppointment must be used within BookAppointmentProvider"
    );
  }
  
  return context;
};

export default useBookAppointment;
