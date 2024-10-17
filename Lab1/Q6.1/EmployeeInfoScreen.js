import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const EmployeeInfoScreen = ({ onUpdate }) => {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");

  const handleUpdate = () => {
    if (fullName && age && occupation) {
      // Call the onUpdate prop function with the entered data
      onUpdate({ fullName, age, occupation });
      Alert.alert("Success", "Employee information updated successfully!");

      // Clear the form
      setFullName("");
      setAge("");
      setOccupation("");
    } else {
      Alert.alert("Error", "Please fill all fields");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full Name:</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <Text style={styles.label}>Occupation:</Text>
      <TextInput
        style={styles.input}
        value={occupation}
        onChangeText={setOccupation}
      />

      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default EmployeeInfoScreen;
