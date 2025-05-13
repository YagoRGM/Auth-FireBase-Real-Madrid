// Joao Pedro da Cunha Machado e Yago Roberto Gomes Moraes
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import s3 from '../../awsConfig';

const BUCKET_NAME = "bucket-storage-senai-31";
const FOLDER = "imagens/";

export default function ListarImagens({ navigation }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await s3
          .listObjectsV2({ Bucket: BUCKET_NAME, Prefix: FOLDER })
          .promise();

        const imageFiles = response.Contents.filter((file) =>
          file.Key.match(/\.(jpg|jpeg|png)$/i)
        );

        const imagensUrl = imageFiles.map((file) => ({
          name: file.Key.split("/").pop(),
          url: `https://${BUCKET_NAME}.s3.amazonaws.com/${file.Key}`,
        }));

        setImages(imagensUrl);
      } catch (error) {
        console.error("Erro ao listar imagens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lista de Imagens</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#ff79c6" />
      ) : (
        images.map((img, index) => (
          <View key={index} style={styles.imageBox}>
            <Image source={{ uri: img.url }} style={styles.image} />
            <Text style={styles.imageName}>{img.name}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageBox: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 12,
  },
  imageName: {
    marginTop: 8,
    fontSize: 16,
    color: '#555',
  },
});
