/**
 * Error handling utilities
 */
import { showMessage } from "react-native-flash-message";

/**
 * Show an error message
 * @param {string} message - Error message to display
 */
export const showErrorMessage = (message) => {
  showMessage({
    message: message || "An error occurred",
    type: "danger",
  });
};

/**
 * Show a success message
 * @param {string} message - Success message to display
 */
export const showSuccessMessage = (message) => {
  showMessage({
    message: message || "Success",
    type: "success",
  });
};

/**
 * Show a warning message
 * @param {string} message - Warning message to display
 */
export const showWarningMessage = (message) => {
  showMessage({
    message: message || "Warning",
    type: "warning",
  });
};

/**
 * Show a custom message
 * @param {string} message - Message to display
 * @param {string} type - Message type (success, danger, warning, info)
 */
export const showTopMessage = (message, type = "info") => {
  showMessage({
    message,
    type,
  });
};

export default showErrorMessage;
