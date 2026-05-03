// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState(null);

  const updateAuthentication = (authenticated) => {
    setUserAuthenticated(authenticated);
  };

  const saveAppointment = (appointmentData) => {
    setBookedAppointment(appointmentData);
  };

  const clearAppointment = () => {
    setBookedAppointment(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        userAuthenticated, 
        updateAuthentication,
        bookedAppointment,
        saveAppointment,
        clearAppointment
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
