// Joao Pedro da Cunha Machado e Yago Roberto Gomes Moraes
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import s3 from "../../awsConfig";
import * as Notifications from 'expo-notifications';

const S3_BUCKET = "bucket-storage-senai-31";

export default function UploadVideos({ navigation }) {
  const [video, setVideo] = useState(null);
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["video/*"],
        copyToCacheDirectory: true,
      });

      const asset =
        result.assets && result.assets.length > 0 ? result.assets[0] : result;

      if (asset && asset.uri) {
        setVideo({
          uri: asset.uri,
          name: asset.name,
          type: asset.mimeType || "video/mp4",
        });
        setModalVisible(true);
      } else {
        alert("Erro: nenhum vídeo selecionado.");
      }
    } catch (error) {
      alert("Erro: não foi possível selecionar o vídeo.");
    }
  };

  const notificarUpload = async (mensagem = "Upload de vídeo realizado com sucesso!") => {
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

  const uploadVideo = async () => {
    if (!video) {
      alert("Erro: selecione um vídeo.");
      return;
    }

    if (!category.trim()) {
      alert("Erro: insira o nome da categoria.");
      return;
    }

    try {
      setUploading(true);
      console.log("Iniciando upload do vídeo...", video);

      const response = await fetch(video.uri);
      const blob = await response.blob();
      const filePath = `videos/${category}/${Date.now()}_${video.name}`;

      const uploadParams = {
        Bucket: S3_BUCKET,
        Key: filePath,
        Body: blob,
        ContentType: video.type,
      };
      s3.upload(uploadParams, async (err, data) => {
        setUploading(false);
        if (err) {
          console.error("Erro no upload:", err);
          alert("Erro ao enviar o vídeo.");
        } else {
          console.log("Vídeo enviado. URL:", data.Location);
          alert("Sucesso: vídeo enviado!");
          setVideo(null);
          setCategory("");
          await notificarUpload("Seu vídeo foi enviado com sucesso!"); // Notificação local aqui!
        }
      });
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar o vídeo.");
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload de Vídeo</Text>

      <Button title="Selecionar Vídeo" onPress={pickVideo} />

      {video && (
        <View style={styles.form}>
          <Text style={styles.label}>Categoria:</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="Digite a categoria"
          />

          {uploading ? (
            <ActivityIndicator size="large" color="#ff79c6" />
          ) : (
            <Button title="Enviar Vídeo" onPress={uploadVideo} />
          )}
        </View>
      )}

      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "90%",
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
  },
});
