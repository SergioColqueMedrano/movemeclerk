import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { ButtonExit } from "../../../components/ButtonExit";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import { useState, useEffect } from "react";

export default function ExerciseHome() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const navigation = useNavigation();

    // Estado para almacenar los ejercicios
    const [exercises, setExercises] = useState([]);

    // useEffect para obtener los ejercicios de la API cuando el componente se monta
    useEffect(() => {
        fetch('https://jz420zgh-3000.brs.devtunnels.ms/exercises')
            .then(response => response.json())
            .then(data => setExercises(data))
            .catch(error => console.error('Error fetching exercises:', error));
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: user?.imageUrl }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Hola, Administrador</Text>
                </View>
                <ButtonExit icon="exit-outline" title="Salir" onPress={() => signOut()} />
            </View>

            {/* Aquí añadimos los botones dinámicos en la parte central */}
            <ScrollView contentContainerStyle={styles.centralButtonsContainer}>
                {
                    exercises.map((exercise, index) => (
                        <View style={styles.button} key={exercise.id}>                    
                            <Text style={styles.buttonNumber}>{exercise.name}</Text>  {/* Mostrar el nombre del ejercicio */}
                            <View style={styles.div}>
                                <TouchableOpacity onPress={() => router.replace("/(exerciseEdit)", { exerciseId: exercise.id })}>
                                    <Octicons name="pencil" size={24} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => router.replace("/(exerciseDelete)", { exerciseId: exercise.id })}>
                                    <Entypo name="cross" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                }
                
                <TouchableOpacity style={styles.buttonGreen} onPress={() => router.replace("/(exerciseCreate)")}>
                    <FontAwesome name="plus" size={30} color="white" />
                    <Text style={styles.buttonText}>Agregar Ejercicio</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.replace("/(categoryHome)")}>
                    <Entypo name="home" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
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
    header: {
        flexDirection: "row",
        padding: 32,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    textContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    text: {
        fontSize: 16,
        color: '#fff',
        textAlign: "left",
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 50,
        backgroundColor: "#323238",
        borderWidth: 4,
        borderColor: "#323238",
    },
    centralButtonsContainer: {
        padding: 30,
        alignItems: "center",
        backgroundColor: "#121214",
    },
    div: {
        flexDirection: 'row',
    },
    button: {
        flexDirection: 'column',
        width: 364,
        padding: 30,
        marginVertical: 8,
        backgroundColor: "#323238",
        borderRadius: 6,
        alignItems: "flex-start",
    },
    buttonGreen: {
        flexDirection: 'row',
        justifyContent: "center",
        width: 364,
        padding: 30,
        marginVertical: 8,
        backgroundColor: "#00875F",
        borderRadius: 6,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        paddingTop: 10,
        fontSize: 16,
    },
    buttonNumber: {
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
});
