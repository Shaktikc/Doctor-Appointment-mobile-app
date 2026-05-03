import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";

/**
 * DoctorDetailsScreen Component
 * Displays detailed information about a selected doctor
 */
const DoctorDetails = ({ route }) => {
  const { doctor } = route.params ?? {};
  const navigation = useNavigation();

  const handleBookAppointment = () => {
    navigation.navigate("BookAppointment", { doctor });
  };

  if (!doctor) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.noDataContainer}>
          <Image
            source={require("../../assets/dataNotFound.jpg")}
            style={styles.noDataImage}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Doctor Details Not Found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Section - Doctor Image and Name */}
        <View style={styles.topContainer}>
          <Image
            source={{ uri: doctor.photo }}
            style={styles.doctorImage}
          />
          <Text style={styles.doctorName}>{doctor.name}</Text>
        </View>

        {/* Middle Container with Info Boxes */}
        <View style={styles.middleContainer}>
          {/* Location */}
          <View style={styles.box}>
            <View style={styles.locationContainer}>
              <FontAwesome name="map-marker" size={30} color="#00b894" />
              <Text style={styles.locationText}>
                Location: {doctor.location}
              </Text>
            </View>
          </View>

          {/* Reviews */}
          <View style={styles.box}>
            <View style={styles.reviewsContainer}>
              <MaterialIcons name="star" size={30} color="#f9ca24" />
              <Text style={styles.reviewsText}>
                Reviews: {doctor.reviews}
              </Text>
            </View>
          </View>

          {/* Experience */}
          <View style={styles.box}>
            <View style={styles.experienceContainer}>
              <Ionicons name="ios-briefcase" size={30} color="#636e72" />
              <Text style={styles.experience}>
                Experience: {doctor.experience}
              </Text>
            </View>
          </View>

          {/* Education */}
          <View style={styles.box}>
            <View style={styles.educationContainer}>
              <Ionicons name="ios-school" size={30} color="#130f40" />
              <Text style={styles.education}>
                Education: {doctor.education}
              </Text>
            </View>
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.bioContainer}>
          <Text style={styles.bioTitle}>About</Text>
          <Text style={styles.bioText}>{doctor.bio}</Text>
        </View>

        {/* Languages Section */}
        <View style={styles.languagesContainer}>
          <Text style={styles.languagesTitle}>Languages</Text>
          <View style={styles.languagesList}>
            {doctor.languages?.map((language, index) => (
              <View key={index} style={styles.languageBadge}>
                <Text style={styles.languageText}>{language}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Specialization</Text>
          <View style={styles.categoriesList}>
            {doctor.categories?.map((category, index) => (
              <View key={index} style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Rating Section */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Rating</Text>
          <View style={styles.ratingBox}>
            <MaterialIcons name="star" size={24} color="#f9ca24" />
            <Text style={styles.ratingText}>{doctor.rating}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Book Button */}
      <View style={styles.buttonContainer}>
        <CustomButton title="Book Appointment" onPress={handleBookAppointment} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noDataImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  topContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  doctorImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  doctorName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  middleContainer: {
    marginBottom: 30,
  },
  box: {
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
  reviewsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewsText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
  experienceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  experience: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
  educationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  education: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
  bioContainer: {
    marginBottom: 20,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  bioText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  languagesContainer: {
    marginBottom: 20,
  },
  languagesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  languagesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  languageBadge: {
    backgroundColor: "#6A5ACD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  languageText: {
    color: "#fff",
    fontSize: 14,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  categoriesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryBadge: {
    backgroundColor: "#DDA0DD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: "#fff",
    fontSize: 14,
  },
  ratingContainer: {
    marginBottom: 30,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 30,
  },
});

export default DoctorDetails;
