import { showMessage } from "react-native-flash-message";

/**
 * ErrorHandler Component
 * Displays error messages using flash messages
 */
export const ErrorHandler = {
  showError: (message) => {
    showMessage({
      message: message || "An error occurred",
      type: "danger",
    });
  },

  showSuccess: (message) => {
    showMessage({
      message: message || "Success",
      type: "success",
    });
  },

  showWarning: (message) => {
    showMessage({
      message: message || "Warning",
      type: "warning",
    });
  },
};

export const showTopMessage = (messageText, messageType) => {
  showMessage({
    message: messageText,
    type: messageType,
  });
};

export default ErrorHandler;
