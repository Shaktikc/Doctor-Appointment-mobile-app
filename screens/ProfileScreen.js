import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../AuthContext";
import { colors } from "../components/styles/Theme";

const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { bookedAppointment, bookedAppointments, cancelAppointment } = useAuth();

  const [cameraPermission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

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

  const openCamera = async () => {
    if (cameraPermission.status === "granted") {
      setModalVisible(false);
      // You can navigate to the camera screen or add camera functionality here
    } else {
      alert("Camera permission is required to use the camera.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="ios-arrow-back" size={30} color="#555" />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Profile</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={image ? { uri: image } : require("../assets/avatar.jpg")}
            style={styles.profileImage}
          />
          <Ionicons
            name="ios-camera"
            size={30}
            color="#333"
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
        <Text style={styles.profileName}>Your Name</Text>
        <Text style={styles.profileEmail}>your.email@example.com</Text>

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
              <View key={appointment.id || index} style={styles.appointmentCard}>
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
                    📅 {appointment.appointmentDate}
                  </Text>
                  <Text style={styles.appointmentInfo}>
                    ⏰ {appointment.appointmentTime}
                  </Text>
                  <Text style={styles.appointmentInfo}>
                    📍 {appointment.location}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    Alert.alert(
                      "Cancel Appointment",
                      "Are you sure you want to cancel this appointment?",
                      [
                        { text: "No", style: "cancel" },
                        {
                          text: "Yes",
                          onPress: () => {
                            cancelAppointment(appointment.id);
                            Alert.alert(
                              "Cancelled",
                              "Your appointment has been cancelled."
                            );
                          },
                          style: "destructive",
                        },
                      ]
                    );
                  }}
                >
                  <Ionicons name="close" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        {(!bookedAppointments || bookedAppointments.length === 0) && (
          <View style={styles.noAppointmentContainer}>
            <Text style={styles.noAppointmentText}>
              No appointments booked yet
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Modal for Image Picker and Camera */}
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
          <CustomButton title="Cancel" onPress={() => setModalVisible(false)} />
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

export default ProfileScreen; // Wrap the component with withNavigation
