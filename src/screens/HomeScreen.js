import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { TopDoctor, TestimonialList } from "../components";
import { useNavigation } from "@react-navigation/native";

/**
 * HomeScreen Component
 * Main landing screen displaying doctors and testimonials
 */
const HomeScreen = () => {
  const navigation = useNavigation();
  onBookAppointmentPress = () => {
    navigation.navigate("Doctor Lists");
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <ImageBackground
          source={require("../../assets/HomeGradientTopBG.jpg")}
          style={styles.topImgBG}
        >
          <View style={styles.topContainer}>
            <BlurView intensity={20} style={styles.blurContainer}>
              <Text style={styles.greetingName}>Hello, Shakti</Text>
              <Image
                source={require("../../assets/avatar.jpg")}
                style={styles.avatar}
              />
            </BlurView>
            <View style={styles.TextAndSearchContainer}>
              {/* Contact Information Section */}
              <View style={styles.contactInfoContainer}>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() => {
                    // Add the code to initiate a call here
                  }}
                >
                  <FontAwesome5 name="phone" size={20} color="#00b894" />
                  <Text style={styles.contactButtonText}>
                    Call us at: (123) 456-7890
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book an Appointment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Card Slider */}
        <View style={styles.cardContainer}>
          <TopDoctor />
        </View>

        {/* Testimonial Section */}
        <TestimonialList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topImgBG: {
    height: 200,
    width: "100%",
    overflow: "hidden",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 1,
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
  },
  blurContainer: {
    elevation: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  greetingName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  TextAndSearchContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  contactInfoContainer: {
    marginBottom: 10,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  contactButtonText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  bookButton: {
    backgroundColor: "#6A5ACD",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default HomeScreen;
