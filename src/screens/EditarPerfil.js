import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  getAuth,
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { getApp } from 'firebase/app';
import s3 from '../../awsConfig';

const BUCKET_NAME = 'bucket-app-firestore';

export default function EditarPerfil() {
  const [user, setUser] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = getAuth(getApp());
  const firestore = getFirestore(getApp());

  useEffect(() => {
    const loadUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const docRef = doc(firestore, 'users', currentUser.uid);
        const userSnap = await getDoc(docRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUser(currentUser);
          setNome(data.nome);
          setEmail(currentUser.email);
          setImageUri(data.photoURL);
        }
      }
    };

    loadUserData();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri, userId) => {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const filePath = `perfil_imagem/${userId}/${filename}`;
    const response = await fetch(uri);
    const blob = await response.blob();

    const params = {
      Bucket: BUCKET_NAME,
      Key: filePath,
      Body: blob,
      ContentType: 'image/jpeg',
    };

    const result = await s3.upload(params).promise();
    return result.Location;
  };

  const handleUpdate = async () => {
    if (!user || !email || !nome || !senhaAtual) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      setLoading(true);

      // Reautenticar com a senha atual
      const credential = EmailAuthProvider.credential(user.email, senhaAtual);
      await reauthenticateWithCredential(user, credential);

      // Fazer upload da imagem se for nova
      let photoURL = imageUri;
      if (imageUri && !imageUri.startsWith('https://')) {
        photoURL = await uploadImage(imageUri, user.uid);
      }

      // Atualizar no Firebase Auth
      await updateProfile(user, {
        displayName: nome,
        photoURL,
      });

      await updateEmail(user, email);

      if (novaSenha) {
        await updatePassword(user, novaSenha);
      }

      // Atualizar no Firestore
      await updateDoc(doc(firestore, 'users', user.uid), {
        nome,
        email,
        photoURL,
      });

      alert('Perfil atualizado!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil. Verifique sua senha atual.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Editar Perfil</Text>

        <TouchableOpacity onPress={pickImage}>
          <Image
            style={styles.image}
            source={
              imageUri
                ? { uri: imageUri }
                : require('../../assets/img/cristiano_ronaldo.webp')
            }
          />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha atual"
          value={senhaAtual}
          onChangeText={setSenhaAtual}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Nova senha (opcional)"
          value={novaSenha}
          onChangeText={setNovaSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>{loading ? 'Salvando...' : 'Salvar'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#003366' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center', width: '90%' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 10 },
  image: { width: 130, height: 135, borderRadius: 50, marginBottom: 10 },
  input: { width: '100%', padding: 10, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: '#3B82F6', padding: 10, borderRadius: 8, marginTop: 10 },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
});
