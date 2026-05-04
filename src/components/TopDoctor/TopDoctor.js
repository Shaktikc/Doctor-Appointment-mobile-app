import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { getAllDoctors } from "../../services";

/**
 * TopDoctor Component
 * Displays a horizontal scrollable list of top doctors
 */
const TopDoctor = () => {
  const navigation = useNavigation();
  const doctorsData = getAllDoctors();

  const handleViewProfile = (doctor) => {
    navigation.navigate("DoctorDetails", { doctor });
  };

  const renderDoctorCard = ({ item }) => (
    <View style={styles.doctorCard}>
      <Image source={{ uri: item.photo }} style={styles.doctorImage} />
      <Text style={styles.doctorName}>{item.name}</Text>
      <Text style={styles.doctorSpecialty}>
        {item.categories && item.categories.length > 0 ? item.categories[0] : ""}
      </Text>
      <TouchableOpacity
        style={styles.learnMoreButton}
        onPress={() => handleViewProfile(item)}
      >
        <Text style={styles.learnMoreButtonText}>More Info</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.doctorsContainer}>
      <Text style={styles.doctorsTitle}>Our Top Doctors</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row" }}>
          {doctorsData.map((item, index) => (
            <View key={index}>{renderDoctorCard({ item })}</View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  doctorsContainer: {
    marginTop: 20,
  },
  doctorsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  doctorCard: {
    width: 220,
    height: 290,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  doctorImage: {
    width: "100%",
    height: 170,
    borderRadius: 10,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#666",
  },
  learnMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00b894",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    justifyContent: "center",
  },
  learnMoreButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default TopDoctor;
