import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const MinimumFinder = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [minimum, setMinimum] = useState(null);

  const findMinimum = () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);
    const number3 = parseFloat(num3);

    if (!isNaN(number1) && !isNaN(number2) && !isNaN(number3)) {
      const min = Math.min(number1, number2, number3);
      setMinimum(min);
    } else {
      alert("Please enter valid numbers");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Minimum of Three Numbers</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter first number"
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter second number"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter third number"
        keyboardType="numeric"
        value={num3}
        onChangeText={setNum3}
      />

      <Button title="Find Minimum" onPress={findMinimum} />

      {minimum !== null && (
        <Text style={styles.result}>Minimum: {minimum}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default MinimumFinder;
