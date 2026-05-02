import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import DoctorCard from "../components/DoctorCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const DoctorListsScreen = () => {
  const [searchText, setSearchText] = useState(""); // State for the search input

  const doctorsData = [
    {
      id: "1",
      name: "Christy Schumm",
      categories: ["Cardiologist", "Internal Medicine"],
      location: "New York",
      experience: "10 years",
      education: "MD, Cardiology",
      languages: ["English", "Spanish"],
      bio: "Christy Schumm is an experienced cardiologist with a passion for helping patients improve their heart health. She has a strong educational background and is fluent in multiple languages.",
      rating: 4.9,
      reviews: 150,
      photo:
        "https://plus.unsplash.com/premium_photo-1681996484614-6afde0d53071?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      name: "Natalia Stanton Jr.",
      categories: ["Dermatologist", "Allergist"],
      location: "Los Angeles",
      experience: "8 years",
      education: "MD, Dermatology",
      languages: ["English", "French"],
      bio: "Natalia Stanton Jr. specializes in dermatology and allergology. She is known for her compassionate care and expertise in treating skin conditions and allergies.",
      rating: 4.8,
      reviews: 120,
      photo:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "3",
      name: "Nola Murazik V",
      categories: ["Pediatrician"],
      location: "Chicago",
      experience: "12 years",
      education: "MD, Pediatrics",
      languages: ["English"],
      bio: "Nola Murazik V is a dedicated pediatrician with over a decade of experience. She provides comprehensive care for children from infancy to adolescence.",
      rating: 4.7,
      reviews: 100,
      photo:
        "https://images.unsplash.com/photo-1612349316228-5942a9b489c2?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "4",
      name: "Elyssa O'Kon",
      categories: ["Orthopedic Surgeon"],
      location: "San Francisco",
      experience: "15 years",
      education: "MD, Orthopedic Surgery",
      languages: ["English", "Spanish"],
      bio: "Elyssa O'Kon is a skilled orthopedic surgeon specializing in joint and bone-related surgeries. She is committed to helping patients regain mobility and strength.",
      rating: 4.9,
      reviews: 140,
      photo:
        "https://images.unsplash.com/photo-1484863137850-59afcfe05386?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "5",
      name: "Dr. Geovany Keebler",
      categories: ["Gynecologist", "Obstetrician"],
      location: "Miami",
      experience: "9 years",
      education: "MD, Obstetrics and Gynecology",
      languages: ["English", "Spanish"],
      bio: "Dr. Geovany Keebler provides comprehensive women's health services with a focus on gynecological and obstetric care. They are dedicated to ensuring the well-being of their patients.",
      rating: 4.7,
      reviews: 110,
      photo:
        "https://cdn.pixabay.com/photo/2017/01/29/21/16/nurse-2019420_1280.jpg",
    },
    {
      id: "6",
      name: "Ramy Malik",
      categories: ["Orthodontist"],
      location: "Chicago",
      experience: "30 years",
      education: "DMD, Orthodontics",
      languages: ["English"],
      bio: "Ramy Malik is an orthodontist who specializes in straightening teeth and correcting bites. He is known for creating beautiful smiles for his patients.",
      rating: 4.8,
      reviews: 130,
      photo:
        "https://cdn.pixabay.com/photo/2017/05/23/17/12/doctor-2337835_1280.jpg",
    },
    // Add more doctor data as needed
  ];

  // Generate categories from the unique categories found in doctorsData
  const categories = Array.from(
    new Set(doctorsData.flatMap((doctor) => doctor.categories))
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Search Input with Search Icon */}
        <View style={styles.searchInputContainer}>
          <Feather
            name="search"
            size={20}
            color="#00b894"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Doctors"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>

        {/* Category Menu (Horizontal Scroll) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryMenu}
        >
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.title}>All Doctors</Text>
        <ScrollView
          contentContainerStyle={styles.doctorList}
          showsVerticalScrollIndicator={false}
        >
          {doctorsData.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DoctorListsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  doctorList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchIcon: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  searchInput: {
    flex: 1,
  },
  categoryMenu: {
    marginTop: 10,
    height: 60, // Increase the height of the category menu
  },
  categoryButton: {
    backgroundColor: "#00b894",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    height: 40, // Increase the height of the category buttons
  },
  categoryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
