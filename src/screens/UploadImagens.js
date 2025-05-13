import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import s3 from '../../awsConfig';
import * as Notifications from 'expo-notifications';

const S3_BUCKET = "bucket-storage-senai-31";

const UploadImagens = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão necessária para acessar suas fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const notificarUpload = async (mensagem = "Upload realizado com sucesso!") => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Ative as notificações para receber avisos.");
      return;
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Upload realizado!",
        body: mensagem,
        sound: true,
      },
      trigger: null,
    });
  };

  const uploadImage = async () => {
    if (!imageUri) {
      alert("Nenhuma imagem selecionada.");
      return;
    }

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const filename = `imagens/${Date.now()}.jpg`;

      const params = {
        Bucket: S3_BUCKET,
        Key: filename,
        Body: blob,
        ContentType: "image/jpeg",
      };

      s3.upload(params, async (err, data) => {
        if (err) {
          console.error("Erro no upload:", err);
          alert("Falha no envio da imagem.");
        } else {
          console.log("Imagem disponível em:", data.Location);
          alert("Imagem salva com sucesso!");
          setImageUri(null);
          await notificarUpload("Sua imagem foi enviada com sucesso!"); // CHAME AQUI!
        }
      });
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar a imagem.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload de Imagem</Text>
      <Button title="Escolher Imagem" onPress={escolherImagem} />
      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Button title="Enviar Imagem" onPress={uploadImage} />
        </>
      )}
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default UploadImagens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20
  }
});
