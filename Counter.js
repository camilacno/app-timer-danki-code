import React from 'react';
import { StyleSheet, Text, View, Picker, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function Counter(props) {
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(44, 136, 138, 1)', 'rgba(44, 136, 138, 0.4)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '100%',
        }}
      />

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{props.minutes} : </Text>
        <Text style={styles.counterText}>{props.seconds}</Text>
      </View>

      <TouchableOpacity
        style={styles.btnReset}
        onPress={() => props.setStatus('select')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
  },
  counterText: {
    color: '#fff',
    fontSize: 40,
  },
  btnReset: {
    backgroundColor: 'rgb(44, 136, 138)',
    height: 80,
    width: 80,
    marginTop: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
});
