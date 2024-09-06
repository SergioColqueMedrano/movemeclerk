import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";

export default function RoutineCreate() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const [selectedExercise, setSelectedExercise] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Crear Rutina</Text>
            
            {/* Campos de entrada de la rutina */}
            <View style={styles.centralButtonsContainer}>
                <TextInput
                    placeholder="Nombre Descripción"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    autoCapitalize="words" // Capitaliza nombres automáticamente
                />
                <TextInput
                    placeholder="Sexo"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    autoCapitalize="none"
                />

                {/* Botón para agregar ejercicios */}
                <TouchableOpacity style={styles.buttonGreen} onPress={() => router.replace("/(exerciseList)")}>
                    <Text style={styles.buttonText}>Agregar ejercicio +</Text>
                </TouchableOpacity>
            </View>

            {/* ScrollView para la lista de ejercicios seleccionados */}
            <View style={styles.scroll}>
            <ScrollView style={styles.scrollContainer}>
                <TouchableOpacity style={styles.exerciseContainer}>
                    <Text style={styles.exerciseTitle}>Espalda</Text>
                    <Text style={styles.exerciseDescription}>Ejercicio 1</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.exerciseContainer}>
                    <Text style={styles.exerciseTitle}>Espalda</Text>
                    <Text style={styles.exerciseDescription}>Ejercicio 4</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.exerciseContainer}>
                    <Text style={styles.exerciseTitle}>Espalda</Text>
                    <Text style={styles.exerciseDescription}>Ejercicio 7</Text>
                </TouchableOpacity>
                
            </ScrollView>
            </View>
            

            {/* Botón para crear la rutina */}
            <View style={styles.centralButtonsContainer}>
                <TouchableOpacity style={styles.buttonGreen} onPress={() => router.replace("/(routineHome)")}>
                    <Text style={styles.buttonText}>Crear Rutina</Text>
                </TouchableOpacity>

                {/* Botón para regresar */}
                <TouchableOpacity onPress={() => router.replace("/(routineHome)")}>
                    <AntDesign name="arrowleft" size={24} color="green" />
                </TouchableOpacity>
            </View>

            {/* Footer con navegación */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.replace("/(categoryHome)")}>
                    <Entypo name="home" size={24} color="white" />
                </TouchableOpacity>
                
                <TouchableOpacity>
                    <MaterialIcons name="bookmark-add" size={24} color="white" />
                </TouchableOpacity>

                {/* Botón activo marcado con color verde */}
                <TouchableOpacity onPress={() => router.replace("/(routineHome)")}>
                    <Feather name="list" size={24} color="green" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace("/(exerciseHome)")}>
                    <FontAwesome5 name="dumbbell" size={24} color="white" />
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
    buttonGreen: {
        flexDirection: 'row',
        justifyContent: "center",
        paddingHorizontal: 16,
        width: 364, // Ajusta el ancho según el diseño
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
        backgroundColor: "#121214",
    },
    scroll: {
        width: 361,
        height: 177,
        alignItems: "center",
    },
    scrollContainer: {
        flex: 1,
        marginVertical: 60,
        paddingHorizontal: 80, // Asegura que el contenido esté alineado con el botón
    },
    exerciseContainer: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#121214",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#00875F",
    },
    exerciseTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    exerciseDescription: {
        fontSize: 14,
        color: "#ccc",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        width: '100%',
        padding: 20,
        marginVertical: 5,
        backgroundColor: '#202024', // Color negro para los inputs
        borderRadius: 5,
        color: '#fff',
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
