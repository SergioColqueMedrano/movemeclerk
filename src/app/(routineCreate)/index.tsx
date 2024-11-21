import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    ScrollView,
    TextInput,
} from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";

import { BASE_URL } from '@env';

export default function RoutineCreate() {
    const { user } = useUser();
    const { signOut } = useAuth();

    const [name, setName] = useState("");
    const [gender, setGender] = useState("male");
    const [daysCount, setDaysCount] = useState(1);
    const [currentDay, setCurrentDay] = useState(1);
    const [routine, setRoutine] = useState(
        Array.from({ length: daysCount }, () => ({ exercises: [] }))
    );

    const [selectedExercises, setSelectedExercises] = useState([]);

    // Función para manejar el POST
    const handleCreateRoutine = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/routines`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        gender: gender,
                        daysCount: daysCount,
                        exercises: routine,
                        categoryId: 1, // Ajustar según la lógica necesaria
                    }),
                }
            );

            if (response.ok) {
                Alert.alert("Éxito", "Rutina creada correctamente");
                router.replace("/(routineHome)");
            } else {
                const errorData = await response.json();
                Alert.alert("Error", errorData.message || "Error al crear la rutina");
            }
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al conectar con el servidor");
        }
    };

    const handleAddExercise = (exercise) => {
        setRoutine((prevRoutine) => {
            const updatedRoutine = [...prevRoutine];
            updatedRoutine[currentDay - 1].exercises.push(exercise);
            return updatedRoutine;
        });
    };

    const updateDaysCount = (count) => {
        setDaysCount(count);
        setRoutine(Array.from({ length: count }, () => ({ exercises: [] })));
        setCurrentDay(1); // Reiniciar al día 1
    };

    const renderExercises = () => {
        const exercises = routine[currentDay - 1]?.exercises || [];
        return exercises.length > 0 ? (
            exercises.map((exercise, index) => (
                <TouchableOpacity key={index} style={styles.exerciseContainer}>
                    <Text style={styles.exerciseTitle}>{exercise.category}</Text>
                    <Text style={styles.exerciseDescription}>{exercise.name}</Text>
                </TouchableOpacity>
            ))
        ) : (
            <Text style={styles.noExercisesText}>No se han agregado ejercicios.</Text>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.textHeader}>Crear Rutina</Text>

            {/* Inputs */}
            <TextInput
                placeholder="Nombre de la rutina"
                placeholderTextColor="#ccc"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            {/* Selector de género */}
            <View style={styles.input}>
                <View style={styles.genderContainer}>
                    <TouchableOpacity
                        style={[
                            styles.genderOption,
                            gender === "male" && styles.genderOptionSelected,
                        ]}
                        onPress={() => setGender("male")}
                    >
                        <Text
                            style={[
                                styles.genderText,
                                gender === "male" && styles.genderTextSelected,
                            ]}
                        >
                            Hombre
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.genderOption,
                            gender === "female" && styles.genderOptionSelected,
                        ]}
                        onPress={() => setGender("female")}
                    >
                        <Text
                            style={[
                                styles.genderText,
                                gender === "female" && styles.genderTextSelected,
                            ]}
                        >
                            Mujer
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Selector de cantidad de días */}
            <View style={styles.input}>
                <View style={styles.genderContainer}>
                    {[1, 2, 3, 4, 5].map((day) => (
                        <TouchableOpacity
                            key={day}
                            style={[
                                styles.genderOption,
                                daysCount === day && styles.genderOptionSelected,
                            ]}
                            onPress={() => updateDaysCount(day)}
                        >
                            <Text
                                style={[
                                    styles.genderText,
                                    daysCount === day && styles.genderTextSelected,
                                ]}
                            >
                                {day} día{day > 1 ? "s" : ""}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Selector de día activo */}
            <View style={styles.input}>
                <ScrollView horizontal>
                    {Array.from({ length: daysCount }, (_, i) => i + 1).map((day) => (
                        <TouchableOpacity
                            key={day}
                            style={[
                                styles.dayOption,
                                currentDay === day && styles.dayOptionSelected,
                            ]}
                            onPress={() => setCurrentDay(day)}
                        >
                            <Text
                                style={[
                                    styles.dayText,
                                    currentDay === day && styles.dayTextSelected,
                                ]}
                            >
                                Día {day}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Botón para agregar ejercicios */}
            <TouchableOpacity
                style={styles.buttonGreen}
                onPress={() =>
                    handleAddExercise({
                        category: "Espalda",
                        name: `Ejercicio para día ${currentDay}`,
                    })
                }
            >
                <Text style={styles.buttonText}>Agregar ejercicio +</Text>
            </TouchableOpacity>

            {/* Lista de ejercicios del día actual */}
            <View style={styles.scroll}>
                <ScrollView>{renderExercises()}</ScrollView>
            </View>

            {/* Botón para guardar la rutina */}
            <TouchableOpacity
                style={styles.buttonGreen}
                onPress={handleCreateRoutine}
            >
                <Text style={styles.buttonText}>Guardar Rutina</Text>
            </TouchableOpacity>
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
    textHeader: {
        margin: 30,
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        padding: 20,
        marginVertical: 5,
        backgroundColor: "#202024",
        borderRadius: 5,
        color: "#fff",
    },
    scroll: {
        width: "100%",
        height: 200,
        paddingHorizontal: 30,
    },
    buttonGreen: {
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 16,
        width: "100%",
        padding: 20,
        marginVertical: 8,
        backgroundColor: "#00875F",
        borderRadius: 6,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    genderContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    genderOption: {
        flex: 1,
        alignItems: "center",
        padding: 15,
        marginHorizontal: 5,
        backgroundColor: "#202024",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    genderOptionSelected: {
        borderColor: "#00875F",
        backgroundColor: "#121214",
    },
    genderText: {
        color: "#ccc",
        fontSize: 16,
        fontWeight: "bold",
    },
    genderTextSelected: {
        color: "#fff",
    },
    dayOption: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: "#202024",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    dayOptionSelected: {
        borderColor: "#00875F",
        backgroundColor: "#121214",
    },
    dayText: {
        color: "#ccc",
        fontSize: 16,
    },
    dayTextSelected: {
        color: "#fff",
        fontWeight: "bold",
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
    noExercisesText: {
        fontSize: 14,
        color: "#ccc",
        textAlign: "center",
    },
});
