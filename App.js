import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Picker, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Counter from './Counter';

export default function App() {
  const [status, setStatus] = useState('select');

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [alarmSounds, setAlarmSounds] = useState([
    {
      id: 1,
      selected: false,
      sound: 'alarm 1',
      file: 'alarm1.mp3',
    },
    {
      id: 2,
      selected: false,
      sound: 'alarm 2',
      file: 'alarm2.mp3',
    },
    {
      id: 3,
      selected: false,
      sound: 'alarm 3',
      file: 'alarm3.mp3',
    },
  ]);

  var numbers = [];
  for (var i = 1; i <= 60; i++) {
    numbers.push(i);
  }

  function chooseAlarm(id) {
    let tempAlarms = alarmSounds.map((alarm) => {
      if (id != alarm.id) {
        alarm.selected = false;
      } else {
        alarm.selected = true;
      }
      return alarm;
    });
    setAlarmSounds(tempAlarms);
  }

  if (status == 'select') {
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

        <Text style={{ color: '#fff', fontSize: 20, padding: 10 }}>
          Define your timer:
        </Text>

        <View style={styles.pickersContainer}>
          <View style={styles.picker}>
            <Text style={{ color: '#fff' }}>Min:</Text>
            <Picker
              style={{ height: 50, width: 100, color: 'white' }}
              selectedValue={minutes}
              onValueChange={(itemValue, itemIndex) => setMinutes(itemValue)}
            >
              {numbers.map(function (val) {
                return (
                  <Picker.Item
                    key={val}
                    label={val.toString()}
                    value={val.toString()}
                  />
                );
              })}
            </Picker>
          </View>

          <View style={styles.picker}>
            <Text style={{ color: '#fff' }}>Sec:</Text>
            <Picker
              selectedValue={seconds}
              onValueChange={(itemValue, itemIndex) => setSeconds(itemValue)}
              style={{ height: 50, width: 100, color: 'white' }}
            >
              <Picker.Item label='0' value='0' />
              {numbers.map(function (val) {
                return (
                  <Picker.Item
                    key={val}
                    label={val.toString()}
                    value={val.toString()}
                  />
                );
              })}
            </Picker>
          </View>
        </View>

        <View style={styles.btnContainer}>
          {alarmSounds.map((alarm) => {
            if (alarm?.selected) {
              return (
                <TouchableOpacity
                  key={alarm.id}
                  style={styles.btnAlarmSelected}
                  onPress={() => chooseAlarm(alarm.id)}
                >
                  <Text style={{ color: '#fff' }}>{alarm.sound}</Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  style={styles.btnAlarm}
                  key={alarm.id}
                  onPress={() => chooseAlarm(alarm.id)}
                >
                  <Text style={{ color: '#fff' }}>{alarm.sound}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>

        <TouchableOpacity
          style={styles.btnPlay}
          onPress={() => setStatus('play')}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Play!</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (status == 'play') {
    return (
      <Counter
        setStatus={setStatus}
        minutes={minutes}
        seconds={seconds}
      ></Counter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickersContainer: {
    flexDirection: 'row',
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-evenly',
  },
  btnAlarm: {
    padding: 10,
    backgroundColor: 'rgba(44, 136, 138, 0.7)',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnAlarmSelected: {
    padding: 10,
    backgroundColor: 'rgb(44, 136, 138)',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  btnPlay: {
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
