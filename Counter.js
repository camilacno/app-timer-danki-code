import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Picker, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';

export default function Counter(props) {
  var done = false;

  useEffect(() => {
    const timer = setInterval(() => {
      props.setSeconds(props.seconds - 1);

      if (props.seconds <= 0) {
        if (props.minutes > 0) {
          props.setMinutes(minutes - 1);
          props.setSeconds(59);
        } else {
          if (!done) {
            done = true;
            props.setStatus('select');
            props.setMinutes(0);
            props.setSeconds(1);
            playSound();
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  async function playSound() {
    const soundObject = new Audio.Sound();
    try {
      var alarme;

      props.alarms.map((alarm) => {
        if (alarm.selected) {
          alarme = alarm.file;
        }
      });

      await soundObject.loadAsync(alarme);
      await soundObject.playAsync();

      // await soundObject.unloadAsync();
    } catch (error) {
      // An error occurred!
    }
  }

  function resetStatus() {
    props.setStatus('select');
    props.setMinutes(0);
    props.setSeconds(1);
  }

  function formatNumber(number) {
    var finalNumber = '';
    if (number < 10) {
      finalNumber = `0${number}`;
    } else {
      finalNumber = number;
    }
    return finalNumber;
  }

  var seconds = formatNumber(props.seconds);
  var minutes = formatNumber(props.minutes);

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
        <Text style={styles.counterText}>{minutes} : </Text>
        <Text style={styles.counterText}>{seconds}</Text>
      </View>

      <TouchableOpacity style={styles.btnReset} onPress={() => resetStatus()}>
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
