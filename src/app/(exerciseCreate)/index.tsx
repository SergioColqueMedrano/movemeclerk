import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { ButtonExit } from "../../../components/ButtonExit";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react"; // Importar useState

export default function ExerciseCreate() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const navigation = useNavigation();

    // Crear los estados para capturar los inputs
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Función para manejar el POST
    const handleCreateExercise = async () => {
        try {
            const response = await fetch("https://jz420zgh-3000.brs.devtunnels.ms/exercises", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
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
                    onChangeText={setName} // Capturar valor
                />
                {/* Input para descripción */}
                <TextInput
                    placeholder="Descripción"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription} // Capturar valor
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
                
                <TouchableOpacity>
                    <MaterialIcons name="bookmark-add" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
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
    backButton: {
        position: 'absolute',
        top: 40, 
        left: 35, 
        zIndex: 1,  
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
    header: {
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    textHeader: {
        margin: 30,
        fontSize: 20,
        color: '#fff',
        textAlign: "center",
        fontWeight: 'bold',
    },
    Text: {
        margin: 30,
        fontSize: 16,
        color: '#fff',
        textAlign: "left",
    },
    name: {
        fontSize: 16,
        color: '#fff',
        fontWeight: "bold",
        textAlign: "left",
    },
    image: {
        width: 148,
        height: 148,
        borderRadius: 100,
        backgroundColor: "#323238",
        borderWidth: 4,
        borderColor: "#323238",
    },
    centralButtonsContainer: {
        justifyContent: "flex-start",
        padding: 30,
        alignItems: "center",
        height: 665,
        backgroundColor: "#121214",
    },
    button: {
        width: "100%",
        padding: 15,
        marginVertical: 8,
        backgroundColor: "#00875F",
        borderRadius: 6,
        alignItems: "center",
    },
    selectedButton: {
        borderWidth: 2,
        borderColor: "#00B37E",
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
