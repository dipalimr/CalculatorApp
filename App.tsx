import React, { useState } from 'react'; 
import { GestureResponderEvent } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
 // Import vector icons

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [showResultOnly, setShowResultOnly] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);

  const handlePress = (value: string): void => {
    if (value === '=') {
      try {
        const evalResult = eval(input).toString();
        setResult(evalResult);
        setInput(evalResult);
        setShowResultOnly(true);
        setHistory((prevHistory) => [...prevHistory, input + ' = ' + evalResult]);  // Store history
      } catch (error) {
        setResult('Error');
        setInput('');
        setShowResultOnly(true);
      }
    } else if (value === 'AC') {
      setInput('');
      setResult('');
      setShowResultOnly(false);
    } else if (value === '⌫') {
      setInput((prev) => prev.slice(0, -1));
      if (input.length > 1) {
        try {
          const dynamicResult = eval(input.slice(0, -1)).toString();
          setResult(dynamicResult);
        } catch {
          setResult('');
        }
      } else {
        setResult('');
      }
    } else if (value === '%') {
      try {
        const evalResult = (eval(input) / 100).toString();
        setResult(evalResult);
        setInput(evalResult);
        setShowResultOnly(true);
      } catch (error) {
        setResult('Error');
        setInput('');
        setShowResultOnly(true);
      }
    } else if (value === '+/-') {
      if (input) {
        setInput((prev) => (prev[0] === '-' ? prev.slice(1) : '-' + prev));
      } else if (result) {
        setResult((prev) => (prev[0] === '-' ? prev.slice(1) : '-' + prev));
      }
    } else {
      if (showResultOnly && !isNaN(Number(value))) {
        setInput(value);
        setResult('');
        setShowResultOnly(false);
      } else if (showResultOnly && (value === '+' || value === '-' || value === '*' || value === '/')) {
        setInput(result + value);
        setResult('');
        setShowResultOnly(false);
      } else {
        setInput((prev) => prev + value);
        if (!isNaN(Number(value))) {
          try {
            const dynamicResult = eval(input + value).toString();
            setResult(dynamicResult);
          } catch {
            setResult('');
          }
        }
      }
    }
  };

  const clearHistory = () => {
    setHistory([]); // Clear history
    setShowHistory(false); // Hide history view
  };

  const buttons: string[] = [
    'AC',
    '⌫',
    '+/-',
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '%',
    '0',
    '.',
    '=',
  ];

  function toggleHistory(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      {/* Display Section */}
      <View style={styles.display}>
        {showResultOnly ? (
          <Text style={styles.resultText}>{result || '0'}</Text>
        ) : (
          <>
            <Text style={styles.inputText}>{input || '0'}</Text>
            <Text style={styles.dynamicResultText}>{result}</Text>
          </>
        )}
      </View>

      {/* Button Section */}
      <View style={styles.buttons}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, button === '=' ? styles.equalButton : {}, button === 'AC' || button === '⌫' ? styles.secondaryButton : {}]}
            onPress={() => handlePress(button)}
          >
            <Text style={styles.buttonText}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* History Icon and History View */}
      <TouchableOpacity style={styles.historyIcon} onPress={() => setShowHistory(!showHistory)}>
        <Icon name="history" size={30} color="#fff" />
      </TouchableOpacity>


      {showHistory && (
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>History</Text>
            <TouchableOpacity onPress={clearHistory}>
              <Text style={styles.clearHistory}>Clear</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.historyScrollView}>
            {history.map((entry, index) => (
              <Text key={index} style={styles.historyText}>
                {entry}
              </Text>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Calc by Dipali</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111', // Full black background
  },
  display: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#222',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    position: 'relative',
  },
  inputText: {
    fontSize: 50,
    color: '#fff', 
  },
  resultText: {
    fontSize: 50,
    color: '#fff', 
  },
  dynamicResultText: {
    fontSize: 30,
    color: '#aaa',
    opacity: 0.7,
    marginTop: 10,
  },
  buttons: {
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  button: {
    width: '22%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333', // Dark gray buttons
    margin: 5,
    borderRadius: 15,
  },
  equalButton: {
    backgroundColor: '#28a745', // Cyan for "=" button
  },
  secondaryButton: {
    backgroundColor: '#ff4d4d', // Vibrant red for "AC" and "⌫"
  },
  buttonText: {
    fontSize: 30,
    color: '#fff', // White text for buttons
  },
  footer: {
    height: 60,
    backgroundColor: '#222', // Slightly lighter black for footer
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    color: '#aaa',
  },
  historyIcon: {
    position: 'absolute',
    left: 20,
    bottom: 550,
    zIndex: 10,
  },
  
  historyContainer: {
    position: 'absolute',
    left: 15, // Positioning from the left
    bottom: 410, // Adjust this to place the history below the icon
    width: '70%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 8,
    zIndex: 9,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  clearHistory: {
    fontSize: 16,
    color: '#F44336',
  },
  historyText: {
    fontSize: 16,
    color: '#555',
  },
  historyScrollView: {
    maxHeight: 100,
  },
});

export default App;








