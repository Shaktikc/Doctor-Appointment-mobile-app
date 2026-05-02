import { showMessage } from "react-native-flash-message";



export function showTopMessage(messageText, messageType) {
    showMessage({
        message: messageText,
        type: messageType,
    });
}
