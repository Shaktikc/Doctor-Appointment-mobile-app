import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";

import AppNavigation from "./src/navigation/AppNavigation";
import { BookAppointmentProvider } from "./src/context/BookAppointmentContext";

/**
 * Root App Component
 * Entry point of the application
 * Sets up navigation, providers, and global styling
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <BookAppointmentProvider>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
        <FlashMessage position="top" />
      </BookAppointmentProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
