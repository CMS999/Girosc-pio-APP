import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [Inscricao, setInscricao] = useState(null);

  const Devagar = () => {
    Gyroscope.setUpdateInterval(1000);
  };

  const Rapido = () => {
    Gyroscope.setUpdateInterval(200);
  };

  const sub = () => {
    setInscricao(
      Gyroscope.addListener(gyroscopeData => {
        setData(gyroscopeData);
      })
    );
  };

  const unsub = () => {
    Inscricao && Inscricao.remove();
    setInscricao(null);
  };

  useEffect(() => {
    sub();
    return () => unsub();
  }, []);

  const { x, y, z } = data;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Giroscópio:</Text>
      <Text style={styles.text}>
        x: {arredondar(x)} y: {arredondar(y)} z: {arredondar(z)}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={Inscricao ? unsub : sub} style={styles.button}>
          <Text>{Inscricao ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Devagar} style={[styles.button, styles.middleButton]}>
          <Text>Devagar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Rapido} style={styles.button}>
          <Text>Rápido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function arredondar(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});
