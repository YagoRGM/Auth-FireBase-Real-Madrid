// Joao Pedro da Cunha Machado e Yago Roberto Gomes Moraes
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import app from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Notifications from 'expo-notifications';

const db = getFirestore(app);

export default function Elenco() {
    const [usuarios, setUsuarios] = useState([]);
    const [nome, setNome] = useState('');
    const [camisa, setCamisa] = useState('');
    const [altura, setAltura] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [editandoId, setEditandoId] = useState(null);

    // Função pra converter dd/mm/yyyy para Timestamp do Firestore
    const formatarDataParaTimestamp = (dataString) => {
        // Espera o formato yyyy-mm-dd
        const [ano, mes, dia] = dataString.split('-');
        const data = new Date(ano, mes - 1, dia); // Cria a data no fuso horário local
        data.setHours(12); // Ajusta para meio-dia para evitar problemas de fuso horário
        return Timestamp.fromDate(data);
    };

    const buscarJogadores = async () => {
        const snapshot = await getDocs(collection(db, 'real-madrid'));
        setUsuarios(snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                nome: data.nome,
                camisa: data.camisa,
                altura: data.altura,
                // Mostra a data formatada pro usuário
                nascimento: data.nascimento?.toDate().toLocaleDateString('pt-BR') || 'Data não disponível',
            }
        }));
    };

    useEffect(() => {
        buscarJogadores();
    }, []);

    const adicionarOuEditarJogador = async () => {
        if (!nome || !camisa || !altura || !nascimento) {
            alert('Preencha todos os campos');
            return;
        }

        const requestLocalNotificationPermission = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Permissão negada",
                    "Ative as notificações para ver os avisos."
                );
                return false;
            }
            return true;
        };

        const nascimentoTimestamp = formatarDataParaTimestamp(nascimento);

        if (editandoId) {
            await updateDoc(doc(db, 'real-madrid', editandoId), {
                nome,
                camisa,
                altura,
                nascimento: nascimentoTimestamp,
            });
            alert('Jogador atualizado com sucesso!');
        } else {
            await addDoc(collection(db, 'real-madrid'), {
                nome,
                camisa,
                altura,
                nascimento: nascimentoTimestamp,
            });
            alert('Jogador adicionado com sucesso!');

            // Solicita permissão e dispara a notificação
            const permissao = await requestLocalNotificationPermission();
            if (permissao) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Novo jogador adicionado!",
                        body: `${nome} foi incluído no elenco.`,
                        sound: true,
                    },
                    trigger: null,
                });
            }
        }

        setNome('');
        setCamisa('');
        setAltura('');
        setNascimento('');
        setModalVisible(false);
        setEditandoId(null);
        buscarJogadores();
    };

    const deletarJogador = async (id) => {
        await deleteDoc(doc(db, 'real-madrid', id));
        buscarJogadores();

        alert(
            'Usuário excluído com sucesso',
            'Tem certeza que deseja excluir este jogador?',
            [
                { text: 'Ok', style: 'cancel' },

            ]
        );
    };


    const abrirModalParaEditar = (jogador) => {
        setNome(jogador.nome);
        setCamisa(jogador.camisa);
        setAltura(jogador.altura);

        // Converte a data de dd/mm/yyyy para yyyy-mm-dd
        const [dia, mes, ano] = jogador.nascimento.split('/');
        setNascimento(`${ano}-${mes}-${dia}`);

        setEditandoId(jogador.id);
        setModalVisible(true);
    };

    const abrirModalParaAdicionar = () => {
        // Limpa os campos ao abrir o modal para adicionar
        setNome('');
        setCamisa('');
        setAltura('');
        setNascimento('');
        setEditandoId(null);
        setModalVisible(true);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Jogadores do Real Madrid</Text>

            <FlatList
                data={usuarios}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer} // Padding aplicado ao conteúdo
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={styles.itemContent}>
                            <Text style={styles.nomeTexto}>Nome: {item.nome}</Text>
                            <Text>Camisa: {item.camisa}</Text>
                            <Text>Altura: {item.altura}</Text>
                            <Text>Nascimento: {item.nascimento}</Text>
                        </View>
                        <View style={styles.icons}>
                            <TouchableOpacity onPress={() => abrirModalParaEditar(item)}>
                                <Icon name="edit" size={24} color="blue" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deletarJogador(item.id)}>
                                <Icon name="delete" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.addButton} onPress={abrirModalParaAdicionar}>
                <Text style={styles.addButtonText}>Adicionar Jogador</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {editandoId ? 'Editar Jogador' : 'Adicionar Jogador'}
                        </Text>

                        <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
                        <TextInput placeholder="Camisa" value={camisa} onChangeText={setCamisa} style={styles.input} keyboardType="numeric" />
                        <TextInput placeholder="Altura" value={altura} onChangeText={setAltura} style={styles.input} keyboardType="numeric" />
                        <TextInput
                            placeholder="Nascimento (yyyy-mm-dd)"
                            value={nascimento}
                            onChangeText={setNascimento}
                            style={styles.input}
                        />

                        <TouchableOpacity style={styles.saveButton} onPress={adicionarOuEditarJogador}>
                            <Text style={styles.saveButtonText}>{editandoId ? 'Salvar Alterações' : 'Adicionar'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { setModalVisible(false); setEditandoId(null); }}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6f2ff',
    },
    listContainer: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        color: '#003366',
        textAlign: 'center',
    },
    item: {
        width: '90%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3, // Android sombra
    },
    itemContent: {
        flex: 1,
    },
    nomeTexto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 4,
    },
    icons: {
        flexDirection: 'row',
        gap: 10,
    },
    addButton: {
        backgroundColor: '#0066cc',
        padding: 15,
        margin: 30,
        alignItems: 'center',
        borderRadius: 8,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#99ccff',
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#ffffff'
    },
    saveButton: {
        backgroundColor: '#003366',
        padding: 15,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    cancelButtonText: {
        color: '#cc0000',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    }
}
);
