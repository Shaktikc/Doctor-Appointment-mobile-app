import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { ViewDoctorButton } from "../components";
import { getAllDoctors } from "../mockApi";

/**
 * DoctorListsScreen Component
 * Displays list of doctors with search and filter functionality
 */
const DoctorLists = () => {
  const [searchText, setSearchText] = useState("");
  const doctorsData = getAllDoctors();

  // Generate unique categories from doctors data
  const categories = Array.from(
    new Set(doctorsData.flatMap((doctor) => doctor.categories))
  );

  // Filter doctors based on search text
  const filteredDoctors = doctorsData.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Category Menu (Horizontal Scroll) */}


        <Text style={styles.title}>All Doctors</Text>
        <ScrollView
          contentContainerStyle={styles.doctorList}
          showsVerticalScrollIndicator={false}
        >
          {filteredDoctors.map((doctor) => (
            <ViewDoctorButton key={doctor.id} doctor={doctor} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DoctorLists;

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
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  categoryMenu: {
    marginBottom: 10,
  },
  categoryButton: {
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#6A5ACD",
    borderRadius: 20,
  },
  categoryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
