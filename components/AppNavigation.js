import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import DoctorListsScreen from "../screens/DoctorListsScreen";
import MyAppointment from "../screens/MyAppointment";
import DoctorDetailsScreen from "../screens/DoctorDetailsScreen";
import BookAppointment from "./BookAppointment/BookAppointment";




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Octicons name="home" size={size} color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Doctor Lists"
      component={DoctorListsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="local-hospital" size={size} color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="My Appointments"
      component={MyAppointment}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="list" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} />
      <Stack.Screen name="BookAppointment" component={BookAppointment} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
