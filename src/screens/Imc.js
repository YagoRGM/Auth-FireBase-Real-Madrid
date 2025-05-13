// Joao Pedro da Cunha Machado e Yago Roberto Gomes Moraes
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Imc() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);

  const calcularIMC = () => {
    if (!peso || !altura) return;
    const alturaMetros = parseFloat(altura) / 100; // Convertendo cm para metros
    const resultado = (parseFloat(peso) / (alturaMetros ** 2)).toFixed(2);
    setImc(resultado);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Calculadora de IMC</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Peso (kg)" 
          keyboardType="numeric"
          onChangeText={setPeso} 
          value={peso} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Altura (cm)" 
          keyboardType="numeric"
          onChangeText={setAltura} 
          value={altura} 
        />
        <TouchableOpacity style={styles.button} onPress={calcularIMC}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
        {imc && <Text style={styles.result}>Seu IMC: {imc}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003366',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 8,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#3B82F6',
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  result: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginTop: 15,
  },
});
