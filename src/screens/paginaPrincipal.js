// Joao Pedro da Cunha Machado e Yago Roberto Gomes Moraes
import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PaginaPrincipal() {
    const navigation = useNavigation();

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.ScrollContainer}>

                <View style={styles.btns}>
                    <Text style={styles.title}>Navegue entre as telas</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.button}>
                        <Text style={styles.buttonText}>Editar Perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Sobre')} style={styles.button}>
                        <Text style={styles.buttonText}>Sobre Nós</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Elenco')} style={styles.button}>
                        <Text style={styles.buttonText}>Ver Elenco</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Lampada')} style={styles.button}>
                        <Text style={styles.buttonText}>Lâmpada</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Imc')} style={styles.button}>
                        <Text style={styles.buttonText}>Descubra seu IMC</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.button}>
                        <Text style={styles.buttonText}>Faça Cadastro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('ListarImagens')} style={styles.button}>
                        <Text style={styles.buttonText}>Listar Imagens</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('UploadImagens')} style={styles.button}>
                        <Text style={styles.buttonText}>Upload Imagem</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('ListarVideo')} style={styles.button}>
                        <Text style={styles.buttonText}>Listar Videos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('UploadVideos')} style={styles.button}>
                        <Text style={styles.buttonText}>Upload videos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.logoutButton]}>
                        <Text style={styles.buttonText}>Sair</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003366',
        paddingTop: 20,
    },
    ScrollContainer: {
        alignItems: 'center', // Centraliza o conteúdo
        paddingBottom: 40,
    },
    btns: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#00ccff',
        margin: 20,
        textShadowColor: '#001f3f',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    button: {
        backgroundColor: '#00509e',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: 300,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        borderWidth: 2,
        borderColor: '#00ccff',
    },
    logoutButton: {
        backgroundColor: '#FF5252',
        borderColor: '#FF0000',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});
