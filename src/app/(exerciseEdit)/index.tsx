import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { router } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

import { BASE_URL } from '@env';

type ExerciseEditRouteParams = {
    params: {
        exerciseId: string;
    };
};

export default function ExerciseEdit() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const route = useRoute<RouteProp<ExerciseEditRouteParams>>();
    const dispatch = useDispatch();

    const [exerciseName, setExerciseName] = useState<string>("");
    const [exerciseDescription, setExerciseDescription] = useState<string>("");
    const exerciseId = route.params?.exerciseId;

    useEffect(() => {
        if (exerciseId) {
            fetch(`${BASE_URL}/${exerciseId}`)
                .then(response => response.json())
                .then(data => {
                    setExerciseName(data.name || "");
                    setExerciseDescription(data.description || "");
                })
                .catch(error => console.error('Error fetching exercise details:', error));
        }
    }, [exerciseId]);

    const handleUpdateExercise = () => {
        if (exerciseId) {
            fetch(`${BASE_URL}/exercises/${exerciseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: exerciseName,
                    description: exerciseDescription,
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error updating exercise');
                }
                return response.json();
            })
            .then(data => {
                console.log('Exercise updated successfully:', data);
                router.push("/(exerciseHome)");
            })
            .catch(error => console.error('Error updating exercise:', error));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Modificar Ejercicio</Text>
            
            <View style={styles.centralButtonsContainer}>
                <TextInput
                    value={exerciseName}
                    onChangeText={setExerciseName}
                    placeholder="Nombre del Ejercicio"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                />
                <TextInput
                    value={exerciseDescription}
                    onChangeText={setExerciseDescription}
                    placeholder="Descripción del Ejercicio"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                />
                
                <TouchableOpacity style={styles.buttonGreen} onPress={handleUpdateExercise}>
                    <Text style={styles.buttonText}>Editar Ejercicio</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/(exerciseHome)")}>
                    <AntDesign name="arrowleft" size={24} color="green" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#202024",
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        padding: 10,
    },
    buttonGreen: {
        justifyContent: "center",
        paddingHorizontal: 16,
        width: '100%',
        padding: 20,
        marginVertical: 8,
        backgroundColor: "#00875F",
        borderRadius: 6,
        alignItems: "center",
    },
    textHeader: {
        marginTop: 50,
        fontSize: 22,
        color: '#fff',
        textAlign: "center",
        fontWeight: 'bold',
    },
    centralButtonsContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#121214",
        flex: 1,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#323238',
        borderRadius: 5,
        color: '#fff',
    },
});
