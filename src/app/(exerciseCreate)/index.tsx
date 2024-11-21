import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { ButtonExit } from '../../../components/ButtonExit';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import { BASE_URL } from '@env';
// Define el tipo para los elementos en mediaList
type MediaItem = {
    mediaId: number;
    description: string;
};

export default function ExerciseCreate() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [mediaList, setMediaList] = useState<MediaItem[]>([]);
    const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);

    // Cargar lista de media al montar el componente
    useEffect(() => {
        const fetchMediaList = async () => {
            try {
                const response = await fetch(`${BASE_URL}/media`);
                if (response.ok) {
                    const data: MediaItem[] = await response.json();
                    setMediaList(data);
                } else {
                    Alert.alert("Error", "No se pudo cargar la lista de media");
                }
            } catch (error) {
                Alert.alert("Error", "Hubo un problema al conectar con el servidor");
            }
        };

        fetchMediaList();
    }, []);

    // Función para manejar el POST
    const handleCreateExercise = async () => {
        try {
            const response = await fetch(`${BASE_URL}/exercises`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    mediaId: selectedMediaId ? parseInt(selectedMediaId) : null, // Convertimos a integer
                }),
            });

            if (response.ok) {
                Alert.alert("Éxito", "Ejercicio creado correctamente");
                router.replace("/(exerciseHome)");
            } else {
                const errorData = await response.json();
                Alert.alert("Error", errorData.message || "Error al crear el ejercicio");
            }
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al conectar con el servidor");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Crear Ejercicio</Text>

            <View style={styles.centralButtonsContainer}>
                {/* Input para nombre */}
                <TextInput
                    placeholder="Nombre"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                {/* Input para descripción */}
                <TextInput
                    placeholder="Descripción"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                />
                {/* Input para Media ID, permitiendo edición manual */}
                <TextInput
                    placeholder="Media ID"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    value={selectedMediaId ? selectedMediaId.toString() : ''}
                    onChangeText={(text) => setSelectedMediaId(text)}
                />

                {/* Lista de media para seleccionar mediaId */}
                <FlatList
                    data={mediaList}
                    keyExtractor={(item) => item.mediaId.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.mediaItem,
                                item.mediaId.toString() === selectedMediaId && styles.selectedMediaItem
                            ]}
                            onPress={() => setSelectedMediaId(item.mediaId.toString())}
                        >
                            <Text style={styles.mediaText}>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                />

                {/* Botón para crear ejercicio */}
                <TouchableOpacity style={styles.buttonGreen} onPress={handleCreateExercise}>
                    <Text style={styles.buttonText}>Crear Ejercicio</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace("/(exerciseHome)")}>
                    <AntDesign name="arrowleft" size={24} color="green" />
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.replace("/(categoryHome)")}>
                    <Entypo name="home" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace("/(categoryCreate)")}>
                    <MaterialIcons name="bookmark-add" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace("/(routineHome)")}>
                    <Feather name="list" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace("/(exerciseHome)")}>
                    <FontAwesome5 name="dumbbell" size={24} color="green" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        justifyContent: "flex-start",
        backgroundColor: "#202024",
    },
    mediaItem: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: "#323238",
        borderRadius: 5,
    },
    selectedMediaItem: {
        backgroundColor: "#00875F",
    },
    mediaText: {
        color: "#fff",
        fontSize: 16,
    },
    buttonGreen: {
        flexDirection: 'row',
        justifyContent: "center",
        paddingHorizontal: 16,
        width: 364,
        padding: 30,
        marginVertical: 8,
        backgroundColor: "#00875F",
        borderRadius: 6,
        alignItems: "center",
    },
    textHeader: {
        margin: 30,
        fontSize: 20,
        color: '#fff',
        textAlign: "center",
        fontWeight: 'bold',
    },
    centralButtonsContainer: {
        justifyContent: "flex-start",
        padding: 30,
        alignItems: "center",
        height: 665,
        backgroundColor: "#121214",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    footer: {
        padding: 32,
        position: "absolute",
        bottom: 40,
        left: 32,
        right: 32,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    input: {
        width: '100%',
        padding: 20,
        marginVertical: 5,
        backgroundColor: '#202024',
        borderRadius: 5,
        color: '#fff',
    },
});
