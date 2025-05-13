// Yago Roberto Gomes Moraes
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function SobreNos() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Sobre o Real Madrid</Text>

            <Image
                style={styles.logo}
                source={require('../../assets/img/Real_Madrid.png')}
            />

            <Text style={styles.subtitle}>História do Clube</Text>
            <View style={styles.card}>
                <Text style={styles.text}>
                    O Real Madrid Club de Fútbol foi fundado em 1902 e se tornou um dos clubes mais vitoriosos do mundo.
                    Com 14 títulos da Liga dos Campeões, é reconhecido como um gigante do futebol mundial.
                </Text>
            </View>

            <Text style={styles.subtitle}>Principais Conquistas</Text>
            <View style={styles.card}>
                <Text style={styles.text}>🏆 14x Liga dos Campeões</Text>
                <Text style={styles.text}>🏆 36x La Liga</Text>
                <Text style={styles.text}>🏆 9x Mundial de Clubes</Text>
                <Text style={styles.text}>🏆 20x Copa do Rei</Text>
            </View>

            <Text style={styles.subtitle}>Grandes Ídolos</Text>
            <View style={styles.gridContainer}>
                <View style={styles.cardPlayer}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/img/cr7.jpg')}
                    />
                    <Text style={styles.playerName}>Cristiano Ronaldo</Text>
                </View>
                <View style={styles.cardPlayer}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/img/zidane.jpg')}
                    />
                    <Text style={styles.playerName}>Zinedine Zidane</Text>
                </View>
                <View style={styles.cardPlayer}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/img/raul.jpg')}
                    />
                    <Text style={styles.playerName}>Raul González</Text>
                </View>
                <View style={styles.cardPlayer}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/img/sergio_ramos.jpg')}
                    />
                    <Text style={styles.playerName}>Sergio Ramos</Text>
                </View>
                <View style={styles.cardPlayer}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/img/di_stefano.avif')}
                    />
                    <Text style={styles.playerName}>Di Stefano</Text>
                </View>
                <View style={styles.cardPlayer}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/img/roberto_carlos.jpg')}
                    />
                    <Text style={styles.playerName}>Roberto Carlos</Text>
                </View>
                
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#003366',
        paddingVertical: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    logo: {
        width: 110,
        height: 150,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00ccff',
        marginTop: 20,
    },
    card: {
        backgroundColor: '#00509e',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    text: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
    },
    cardPlayer: {
        backgroundColor: '#00509e',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
        width: 120,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    playerName: {
        fontSize: 16,
        color: '#fff',
        marginTop: 5,
        textAlign: 'center',
    },
});
