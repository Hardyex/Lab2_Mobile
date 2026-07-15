import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState('');
  const [history, setHistory] = useState('');

  const handleNumberInput = (num) => {
    if (displayValue === '0') {
      setDisplayValue(num.toString());
      if (!operator) setHistory(num.toString());
      else setHistory(firstValue + ' ' + operator + ' ' + num.toString());
    } else {
      const newValue = displayValue + num;
      setDisplayValue(newValue);
      if (!operator) setHistory(newValue);
      else setHistory(firstValue + ' ' + operator + ' ' + newValue);
    }
  };

  const handleOperatorInput = (operatorInput) => {
    setOperator(operatorInput);
    setFirstValue(displayValue);
    setHistory(displayValue + ' ' + operatorInput);
    setDisplayValue('0');
  };

  const handleEqual = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);
    let result = '0';

    if (operator === '+') result = (num1 + num2).toString();
    else if (operator === '-') result = (num1 - num2).toString();
    else if (operator === '*') result = (num1 * num2).toString();
    else if (operator === '/') result = (num1 / num2).toString();

    setHistory(firstValue + ' ' + operator + ' ' + displayValue);
    setDisplayValue(result);
    setOperator(null);
    setFirstValue('');
  };

  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue('');
    setHistory('');
  };

  const buttons = [
    [7, 8, 9, '÷'],
    [6, 5, 4, 'x'],
    [3, 2, 1, '-'],
    ['C', 0, '=', '+'],
  ];

  return (
    <View style={styles.container}>
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item) => {
            const isOperator = ['÷', 'x', '-', 'C', '=', '+'].includes(item);

            return (
              <TouchableOpacity
                key={item}
                style={[styles.button, isOperator && styles.operatorButton]}
                onPress={() => {
                  if (item === 'C') handleClear();
                  else if (item === '=') handleEqual();
                  else if (typeof item === 'number') handleNumberInput(item);
                  else handleOperatorInput(item);
                }}>
                <Text
                  style={isOperator ? styles.operatorText : styles.buttonText}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#FFF',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    margin: 4,
    borderRadius: 38,
  },
  operatorButton: { backgroundColor: '#EF506B' },
  buttonText: { fontSize: 28, color: '#000' },
  operatorText: { fontSize: 28, color: '#FFF', fontWeight: 'bold' },
});

export default App;
