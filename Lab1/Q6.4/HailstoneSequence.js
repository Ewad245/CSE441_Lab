import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";

const HailstoneSequence = () => {
  const [inputNumber, setInputNumber] = useState("");
  const [sequence, setSequence] = useState([]);

  const calculateHailstoneSequence = () => {
    let n = parseInt(inputNumber, 10);

    if (n > 0) {
      let seq = [];
      while (n !== 1) {
        if (n % 2 === 0) {
          n = n / 2;
        } else {
          n = 3 * n + 1;
        }
        seq.push(n);
      }
      setSequence(seq);
    } else {
      alert("Please enter a positive integer greater than 0.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hailstone Sequence Generator</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a positive integer (n > 0)"
        keyboardType="numeric"
        value={inputNumber}
        onChangeText={setInputNumber}
      />

      <Button title="Generate Sequence" onPress={calculateHailstoneSequence} />

      <ScrollView style={styles.sequenceContainer}>
        {sequence.length > 0 && (
          <Text style={styles.result}>
            Hailstone Sequence: {sequence.join(" ")}
          </Text>
        )}
      </ScrollView>
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
    fontSize: 24,
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
  sequenceContainer: {
    marginTop: 20,
    width: "100%",
  },
  result: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default HailstoneSequence;
