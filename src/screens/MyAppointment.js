import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

import { colors } from "../styles/Theme";
import { useBookAppointment } from "../hooks/useBookAppointment";
import { CustomButton } from "../components";

/**
 * MyAppointment Screen
 * Displays user profile and booked appointments
 */
const MyAppointment = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { bookedAppointments, cancelAppointment, isLoading } = useBookAppointment();
  const [cameraPermission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  /**
   * Pick image from camera roll
   */
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
    setModalVisible(false);
  };

  /**
   * Open camera
   */
  const openCamera = async () => {
    if (cameraPermission.status === "granted") {
      setModalVisible(false);
      // Camera functionality can be added here
    } else {
      Alert.alert("Permission", "Camera permission is required to use the camera.");
    }
  };

  /**
   * Handle appointment cancellation
   */
  const handleCancelAppointment = (appointment) => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            try {
              // Cancel appointment - context handles AsyncStorage persistence
              cancelAppointment(appointment.id);
              Alert.alert("Cancelled", "Your appointment has been cancelled.");
              console.log("Appointment cancelled");
            } catch (error) {
              console.error(" Error cancelling appointment:", error);
              Alert.alert("Error", "Failed to cancel appointment");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
          <ActivityIndicator size="large" color={colors.color_primary} />
          <Text style={{ marginTop: 10, color: colors.color_primary }}>Loading appointments...</Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="ios-arrow-back" size={30} color="#555" />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Appointments</Text>
        </View>

        {/* Profile Image */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={image ? { uri: image } : require("../../assets/avatar.jpg")}
            style={styles.profileImage}
          />
          <Ionicons
            name="ios-camera"
            size={30}
            color="#333"
            style={styles.cameraIcon}
          />
        </TouchableOpacity>

        {/* Profile Info */}
        <Text style={styles.profileName}>Your Name</Text>
        <Text style={styles.profileEmail}>your.email@example.com</Text>

        {/* User Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Location: Your Location</Text>
          <Text style={styles.infoText}>Phone: +123 456 7890</Text>
          <Text style={styles.infoText}>Date of Birth: 01-Jan-1990</Text>
        </View>

        {/* Booked Appointments Section */}
        {bookedAppointments && bookedAppointments.length > 0 && (
          <View style={styles.appointmentContainer}>
            <Text style={styles.appointmentTitle}>
              Your Appointments ({bookedAppointments.length})
            </Text>
            {bookedAppointments.map((appointment, index) => (
              <View
                key={appointment.id || index}
                style={styles.appointmentCard}
              >
                <Image
                  source={{ uri: appointment.doctorPhoto }}
                  style={styles.doctorImage}
                />
                <View style={styles.appointmentDetails}>
                  <Text style={styles.doctorName}>
                    {appointment.doctorName}
                  </Text>
                  <Text style={styles.specialization}>
                    {appointment.specialization} Specialist
                  </Text>
                  <Text style={styles.appointmentInfo}>
                     {appointment.appointmentDate}
                  </Text>
                  <Text style={styles.appointmentInfo}>
                    {appointment.appointmentTime}
                  </Text>
                  <Text style={styles.appointmentInfo}>
                     {appointment.location}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => handleCancelAppointment(appointment)}
                >
                  <Ionicons name="close" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* No Appointments */}
        {(!bookedAppointments || bookedAppointments.length === 0) && (
          <View style={styles.noAppointmentContainer}>
            <Text style={styles.noAppointmentText}>
              No appointments booked yet
            </Text>
          </View>
        )}
      </ScrollView>
      )}

      {/* Modal for Image Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <CustomButton
            title="Pick an image from the camera roll"
            onPress={pickImage}
          />
          <CustomButton title="Open Camera" onPress={openCamera} />
          <CustomButton
            title="Cancel"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 10,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileEmail: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  infoContainer: {
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  appointmentContainer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  appointmentCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  appointmentDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  specialization: {
    fontSize: 14,
    color: colors.color_primary,
    marginBottom: 8,
  },
  appointmentInfo: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  cancelButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  noAppointmentContainer: {
    marginTop: 30,
    paddingVertical: 40,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  noAppointmentText: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
  },
});

export default MyAppointment;
