import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigation from "./components/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { BookAppointmentProvider } from "./BookAppointmentContext";


export default function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  // Function to update authentication state after successful login or signup
  const updateAuthentication = (authenticated) => {
    setUserAuthenticated(authenticated);
  };

  return (
    <SafeAreaProvider>
      <BookAppointmentProvider>
        <NavigationContainer>
            <AppNavigation />
        </NavigationContainer>
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
