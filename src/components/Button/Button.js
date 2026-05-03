import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import styles from "./Button.style";

/**
 * Button Component
 * Reusable button with loading state
 */
export default function Button({
  onPress,
  loading,
  text,
  theme = "primary",
  disabled = false,
}) {
  return (
    <TouchableOpacity
      style={styles[theme].container}
      onPress={onPress}
      disabled={loading || disabled}
    >
      {loading ? (
        <ActivityIndicator
          style={styles[theme].activity_icon}
          color="white"
        />
      ) : (
        <Text style={styles[theme].text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}
