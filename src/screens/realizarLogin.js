// Yago Roberto Gomes Moraes
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebaseConfig';

export default RealizarLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const TentarLogar = () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        navigation.navigate('Início');
      })
      .catch(error => {
        console.error('Login falhou:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#ddd"
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#ddd"
        />
        <TouchableOpacity onPress={TentarLogar} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Início')}>
          <Text>Entrar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004aad',
  },
  box: {
    width: '80%',
    padding: 30,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#004aad',
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#004aad',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
