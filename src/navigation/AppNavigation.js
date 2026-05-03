import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";

import {
  HomeScreen,
  DoctorListsScreen,
  MyAppointment,
  DoctorDetailsScreen,
} from "../screens";
import BookAppointment from "../components/BookAppointment";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * TabNavigator Component
 * Configures bottom tab navigation
 */
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Octicons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Doctor Lists"
      component={DoctorListsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="local-hospital" size={size} color={color} />
        ),
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

/**
 * AppNavigation Component
 * Main navigation stack setup
 */
const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} />
      <Stack.Screen name="BookAppointment" component={BookAppointment} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
