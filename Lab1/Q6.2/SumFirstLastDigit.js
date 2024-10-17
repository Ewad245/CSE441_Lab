import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const SumFirstLastDigit = () => {
  const [number, setNumber] = useState("");
  const [sum, setSum] = useState(null);

  const calculateSum = () => {
    if (number) {
      const numStr = number.toString();
      const firstDigit = parseInt(numStr[0]);
      const lastDigit = parseInt(numStr[numStr.length - 1]);
      const result = firstDigit + lastDigit;
      setSum(result);
    } else {
      setSum(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sum of First and Last Digit</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter a number"
        value={number}
        onChangeText={setNumber}
      />
      <Button title="Calculate Sum" onPress={calculateSum} />
      {sum !== null && <Text style={styles.result}>Sum: {sum}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
  },
});

export default SumFirstLastDigit;
