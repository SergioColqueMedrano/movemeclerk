import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { ButtonExit } from "../../../components/ButtonExit";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";

// Datos de ejemplo para los ejercicios
const days = [
    {
        day: "Día 1",
        exercises: [
            { id: 1, title: "Ejercicio 1", series: "3 series x 12 repeticiones", image: require('@../../../assets/images/avatar.png') },
            { id: 2, title: "Ejercicio 2", series: "3 series x 12 repeticiones", image: require('@../../../assets/images/avatar.png') },
            { id: 3, title: "Ejercicio 3", series: "3 series x 12 repeticiones", image: require('@../../../assets/images/avatar.png') },
            { id: 4, title: "Ejercicio 4", series: "3 series x 12 repeticiones", image: require('@../../../assets/images/avatar.png') },
        ],
    },
    {
        day: "Día 2",
        exercises: [
            { id: 5, title: "Ejercicio 5", series: "4 series x 10 repeticiones", image: require('@../../../assets/images/avatar.png') },
            { id: 6, title: "Ejercicio 6", series: "4 series x 10 repeticiones", image: require('@../../../assets/images/avatar.png') },
            { id: 7, title: "Ejercicio 7", series: "4 series x 10 repeticiones", image: require('@../../../assets/images/avatar.png') },
            { id: 8, title: "Ejercicio 8", series: "4 series x 10 repeticiones", image: require('@../../../assets/images/avatar.png') },
        ],
    }
];

export default function Routine() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const navigation = useNavigation();
    const [expandedDays, setExpandedDays] = useState({}); // Estado para manejar la expansión de los días

    const toggleDay = (day) => {
        setExpandedDays((prev) => ({
            ...prev,
            [day]: !prev[day],
        }));
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={{ uri: user?.imageUrl}} style={styles.image}/>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Hola,</Text>
                    <Text style={styles.name}>{user?.fullName}</Text>
                </View>
                <ButtonExit icon="exit-outline" title="Salir" onPress={() => signOut()} />
            </View>

            {/* Central content */}
            <View style={styles.centralButtonsContainer}>
                <TouchableOpacity style={[styles.button, styles.selectedButton]} onPress={() => router.replace("/(auth)")}>
                    <Text style={styles.buttonText}>HIPERTROFIA</Text>
                </TouchableOpacity>

                {/* Renderización de los días y ejercicios */}
                {days.map((dayData, index) => (
                    <View key={index}>
                        <TouchableOpacity style={styles.dayButton} onPress={() => toggleDay(dayData.day)}>
                            
                            <Text style={styles.dayText}>{dayData.day}</Text>
                            
                            <AntDesign name={expandedDays[dayData.day] ? "up" : "down"} size={24} color="white" />
                            
                           
                        </TouchableOpacity>

                        {expandedDays[dayData.day] && (
                            <FlatList
                                data={dayData.exercises}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.exerciseButton} onPress={() => router.replace("/(exercise)")}>
                                        <Image source={item.image} style={styles.exerciseImage} />
                                        <View style={styles.exerciseInfo}>
                                            <Text style={styles.exerciseTitle}>{item.title}</Text>
                                            <Text style={styles.exerciseSeries}>{item.series}</Text>
                                        </View>
                                        <AntDesign name="right" size={24} color="white" />
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </View>
                ))}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity >
                    <Entypo name="home" size={24} color="green" />
                </TouchableOpacity>
                <TouchableOpacity >
                    <FontAwesome5 name="dumbbell" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity >
                    <FontAwesome5 name="history" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace("/(profile)")}>
                    <FontAwesome name="user-circle" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // Estilos similares a los que ya tenías
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
    name: {
        fontSize: 16,
        color: '#fff',
        fontWeight: "bold",
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
        justifyContent: "flex-start",
        padding: 30,
        alignItems: "center",
        backgroundColor: "#121214",
        flex: 1,
    },
    button: {
        width: 364,
        padding: 30,
        marginVertical: 8,
        backgroundColor: "#323238",
        borderRadius: 6,
        alignItems: "center",
    },
    selectedButton: {
        borderWidth: 2,
        borderColor: "#00B37E",
    },
    buttonText: {
        color: "#00B37E",
        fontSize: 16,
        fontWeight: "bold",
    },
    // Estilos para los días y ejercicios
    dayButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        marginVertical: 4,
        backgroundColor: "#323238",
        borderRadius: 6,
        paddingHorizontal: 12,
        width: 364,
    },
    dayText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    exerciseButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3E3E42",
        borderRadius: 6,
        padding: 10,
        marginVertical: 4,
        width: 364,
    },
    exerciseImage: {
        width: 64,
        height: 64,
        borderRadius: 6,
    },
    exerciseInfo: {
        flex: 1,
        marginLeft: 12,
    },
    exerciseTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    exerciseSeries: {
        color: "#A1A1A1",
        fontSize: 14,
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
