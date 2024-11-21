import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRoute, RouteProp } from "@react-navigation/native";
import { router } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

import { BASE_URL } from '@env';

type ExerciseDeleteRouteParams = {
    params: {
        exerciseId: string;
    };
};

export default function ExerciseDelete() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const route = useRoute<RouteProp<ExerciseDeleteRouteParams>>();
    const exerciseId = route.params?.exerciseId;

    const handleDeleteExercise = () => {
        if (!exerciseId) {
            console.error("No se proporcionó un exerciseId");
            alert("Error: No se pudo identificar el ejercicio.");
            return;
        }

        fetch(`${BASE_URL}/exercises/${exerciseId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el ejercicio');
                }
                return response.json();
            })
            .then(() => {
                console.log('Ejercicio eliminado correctamente');
                router.push("/(exerciseHome)");
            })
            .catch(error => {
                console.error('Error al eliminar el ejercicio:', error);
                alert("Error al eliminar el ejercicio. Intente nuevamente.");
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Eliminar Ejercicio</Text>
            
            <View style={styles.centralButtonsContainer}>
                <Text style={styles.warningText}>
                    ¿Está seguro de que desea eliminar este ejercicio?
                </Text>

                <TouchableOpacity style={styles.buttonRed} onPress={handleDeleteExercise}>
                    <Text style={styles.buttonText}>Eliminar Ejercicio</Text>
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
    buttonRed: {
        justifyContent: "center",
        paddingHorizontal: 16,
        width: '100%',
        padding: 20,
        marginVertical: 8,
        backgroundColor: "#870000",
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
    warningText: {
        fontSize: 18,
        color: '#fff',
        textAlign: "center",
        marginBottom: 20,
        fontWeight: 'bold',
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
