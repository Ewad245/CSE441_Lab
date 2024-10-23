import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const Calculator = () => {
  const [display, setDisplay] = useState('0');

  const buttons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', 'C', '+', '='],
  ];

  const handlePress = value => {
    if (value === 'C') {
      setDisplay('0');
    } else if (value === '=') {
      try {
        // Replace × with * and ÷ with / for evaluation
        const result = eval(display.replace(/×/g, '*').replace(/÷/g, '/'));
        setDisplay(result.toString());
      } catch (error) {
        setDisplay('Error');
      }
    } else {
      setDisplay(display === '0' ? value : display + value);
    }
  };

  const renderButton = (text, index, rowIndex) => {
    const isOperator = ['÷', '×', '-', '+', '='].includes(text);
    const isZero = text === '0';
    const isClear = text === 'C';

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.button,
          isOperator && styles.operatorButton,
          isZero && styles.zeroButton,
          isClear && styles.clearButton,
        ]}
        onPress={() => handlePress(text)}>
        <Text
          style={[
            styles.buttonText,
            isOperator && styles.operatorText,
            isClear && styles.clearText,
          ]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.display}>
        <Text style={styles.displayText}>{display}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button, index) => renderButton(button, index, rowIndex))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  display: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  displayText: {
    fontSize: 64,
    color: '#000',
  },
  buttonContainer: {
    flex: 0.6,
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  zeroButton: {
    width: 70,
  },
  operatorButton: {
    backgroundColor: '#ff9f0a',
  },
  clearButton: {
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    fontSize: 28,
    color: '#000',
  },
  operatorText: {
    color: '#fff',
  },
  clearText: {
    color: '#000',
  },
});

export default Calculator;
