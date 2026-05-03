import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

/**
 * CustomButton Component
 * A simple, reusable button component
 */
const CustomButton = ({ title, onPress, style }) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#00b894",
    color: "#fff",
    elevation: 5,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CustomButton;
