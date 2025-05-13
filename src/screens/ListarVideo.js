import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Video } from 'expo-av';
import s3 from '../../awsConfig';

const bucketname = 'bucket-storage-senai-31';

export default function ListarVideo({ navigation }) {
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const videoRefs = useRef({});

    const fetchCategories = async () => {
        setLoadingCategories(true);
        try {
            const response = await s3
                .listObjectsV2({
                    Bucket: bucketname,
                    Prefix: "videos/",
                    Delimiter: "/"
                })
                .promise();

            const folders = response.CommonPrefixes.map((prefix) => {
                const folderPath = prefix.Prefix;
                return folderPath.replace("videos/", "").replace("/", "");
            });

            setCategories(folders);
            if (folders.length > 0) setCategory(folders[0]);
        } catch (error) {
            console.error("Erro ao carregar categorias: ", error);
        } finally {
            setLoadingCategories(false);
        }
    };

    const fetchVideos = async () => {
        if (!category) return;
        setLoading(true);

        try {
            const response = await s3
                .listObjectsV2({
                    Bucket: bucketname,
                    Prefix: `videos/${category}/`
                })
                .promise();

            const videoFiles = response.Contents?.filter(
                (file) => file.Size > 0 && !file.Key.endsWith("/")
            );

            const videoUrls = videoFiles.map((file) => ({
                key: file.Key,
                name: file.Key.split("/").pop(),
                url: `https://${bucketname}.s3.amazonaws.com/${encodeURI(file.Key)}`
            })) || [];

            setVideos(videoUrls);
        } catch (error) {
            console.error("Erro ao carregar vídeos: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (category) {
            fetchVideos();
        }
    }, [category]);

    const handlePlay = (key) => {
        const videoRef = videoRefs.current[key];
        if (videoRef) {
            videoRef.playAsync();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecione uma categoria</Text>

            {loadingCategories ? (
                <ActivityIndicator size="large" color="#ff79c6" />
            ) : (
                <Picker
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                    style={styles.picker}
                >
                    {categories.map((cat) => (
                        <Picker.Item key={cat} label={cat} value={cat} />
                    ))}
                </Picker>
            )}

            {loading ? (
                <ActivityIndicator size="large" color="#ff79c6" />
            ) : (
                <ScrollView style={styles.scrollView}>
                    {videos.map((video) => (
                        <View key={video.key} style={styles.videoContainer}>
                            <Text style={styles.videoTitle}>{video.name}</Text>
                            <Video
                                ref={(ref) => (videoRefs.current[video.key] = ref)}
                                source={{ uri: video.url }}
                                style={styles.video}
                                useNativeControls
                                resizeMode="contain"
                                isLooping
                            />
                            <Pressable style={styles.playButton} onPress={() => handlePlay(video.key)}>
                                <Text style={styles.playButtonText}>▶️ Play</Text>
                            </Pressable>
                        </View>
                    ))}
                </ScrollView>
            )}

            <Pressable style={styles.button} onPress={() => navigation.navigate('App')}>
                <Text style={styles.buttonText}>Voltar</Text>
            </Pressable>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    picker: {
        height: 50,
        marginBottom: 20
    },
    scrollView: {
        flex: 1
    },
    videoContainer: {
        marginBottom: 30,
        alignItems: 'center'
    },
    videoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
    },
    video: {
        width: '100%',
        height: 200
    },
    playButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginTop: 8
    },
    playButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#1E3A8A',
        padding: 10,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
};
