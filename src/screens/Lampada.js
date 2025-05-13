// Joao Pedro da Cunha Machado e Yago Roberto Gomes Moraes
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Lampada() {
  const [ligada, setLigada] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: ligada ? '#fff' : '#000' }]}>
      <Text style={[styles.text, { color: ligada ? '#000' : '#fff' }]}>
        {ligada ? 'Lâmpada Acesa' : 'Lâmpada Apagada'}
      </Text>
      <TouchableOpacity onPress={() => setLigada(!ligada)}>
        <Image
          source={{
            uri: ligada
              ? 'https://cdn-icons-png.flaticon.com/512/702/702797.png'
              : 'https://cdn-icons-png.flaticon.com/512/702/702814.png',
          }}
          style={styles.lampada}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lampada: {
    width: 150,
    height: 150,
  },
});
