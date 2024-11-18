import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { ButtonExit } from "../../../components/ButtonExit";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import { useState, useEffect } from "react";

export default function RoutineHome() {
    const { user } = useUser();
    const { signOut } = useAuth();

    // Estado para almacenar las rutinas
    const [routines, setRoutines] = useState([]);

    // useEffect para obtener las rutinas de la API cuando el componente se monta
    useEffect(() => {
        fetch('https://jz420zgh-3000.brs.devtunnels.ms/routines')
            .then(response => response.json())
            .then(data => setRoutines(data))
            .catch(error => console.error('Error fetching routines:', error));
    }, []);

    // Función para renderizar cada rutina en el FlatList
    const renderRoutine = ({ item }) => (
        <View style={styles.button} key={item.routineId}>
            <Text style={styles.buttonNumber}>{item.name}</Text>
            <View style={styles.div}>
                <TouchableOpacity onPress={() => router.push({ pathname: "/(routineEdit)", params: { routineId: item.routineId } })}>
                    <Octicons name="pencil" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: "/(routineDelete)", params: { routineId: item.routineId } })}>
                    <Entypo name="cross" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={user?.imageUrl ? { uri: user.imageUrl } : require('../../../assets/images/avatar.png')} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Hola, Administrador</Text>
                </View>
                <ButtonExit icon="exit-outline" title="Salir" onPress={() => { signOut(); router.replace("/(public)") }} />
            </View>

            {/* FlatList para la lista de rutinas */}
            <FlatList
                data={routines}
                renderItem={renderRoutine}
                keyExtractor={(item) => item.routineId.toString()}
                contentContainerStyle={styles.centralButtonsContainer}
                ListFooterComponent={
                    <TouchableOpacity style={styles.buttonGreen} onPress={() => router.replace("/(routineCreate)")}>
                        <FontAwesome name="plus" size={30} color="white" />
                        <Text style={styles.buttonText}>Agregar Rutina</Text>
                    </TouchableOpacity>
                }
            />

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.replace("/(categoryHome)")}>
                    <Entypo name="home" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace("/(categoryCreate)")}>
                    <MaterialIcons name="bookmark-add" size={24} color="white" />
                </TouchableOpacity>
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
        paddingHorizontal: 20,
        alignItems: "center",
        paddingBottom: 120, // Espacio para el menú inferior
    },
    div: {
        flexDirection: 'row',
    },
    button: {
        flexDirection: 'row',
        width: 364,
        padding: 30,
        marginVertical: 8,
        backgroundColor: "#323238",
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "space-between",
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
    buttonText: {
        color: "#fff",
        padding: 15,
        fontSize: 16,
        fontWeight: "bold",
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
