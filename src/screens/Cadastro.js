// Joao Pedro da Cunha Machado e Yago Roberto Gomes Moraes
import React, { useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Text,
    Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getApp } from "firebase/app";
import s3 from "../../awsConfig";

const S3_BUCKET = "bucket-storage-senai-31";

export default function Cadastro({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nome, setNome] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleRegister = async () => {
        if (!email || !password || !nome || !imageUri) {
            alert("Erro, Por favor, preencha todos os campos.");
            return;
        }

        try {
            setLoading(true);
            const auth = getAuth(getApp());
            const firestore = getFirestore(getApp());

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);
            const filePath = `perfil_imagem/${user.uid}/${filename}`;
            const response = await fetch(imageUri);
            const blob = await response.blob();

            const uploadParams = {
                Bucket: S3_BUCKET,
                Key: filePath,
                Body: blob,
                ContentType: "image/jpeg",
            };

            const uploadResult = await s3.upload(uploadParams).promise();
            const photoURL = uploadResult.Location;

            await setDoc(doc(firestore, 'users', user.uid), {
                uid: user.uid,
                email,
                nome,
                photoURL,
            });

            alert("Sucesso, Usuário registrado com sucesso!");
            setLoading(false);
            navigation.navigate("Login");
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            alert("Erro, Não foi possível registrar o usuário.");
            setLoading(false);
        }
    };


    return (
        <View style={styles.container}>

            <View style={styles.box}>
                <Text style={styles.title}>Crie sua conta</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <Pressable style={styles.imagePicker} onPress={pickImage}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.image} />
                    ) : (
                        <Text style={styles.imageText}>Selecionar foto de perfil</Text>
                    )}
                </Pressable>

                <TouchableOpacity onPress={handleRegister} style={styles.button}>
                    <Text style={styles.buttonText}>
                        {loading ? "Cadastrando..." : "Cadastrar"}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#004aad',
    },
    box: {
        width: '90%',
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
        fontSize: 34,
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
    imagePicker: {
        height: 150,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        marginBottom: 24,
        backgroundColor: "#f0f0f0",
    },
    imageText: {
        color: "#888",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 12,
    },
});
