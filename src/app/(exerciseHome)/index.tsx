import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
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

    // Función para renderizar cada ejercicio en el FlatList
    const renderExercise = ({ item }) => (
        <View style={styles.button} key={item.exerciseId}>                    
            <Text style={styles.buttonNumber}>{item.name}</Text>
            <View style={styles.div}>
                <TouchableOpacity onPress={() => router.push({ pathname: "/(exerciseEdit)", params: { exerciseId: item.exerciseId } })}>
                    <Octicons name="pencil" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: "/(exerciseDelete)", params: { exerciseId: item.exerciseId } })}>
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
                <ButtonExit icon="exit-outline" title="Salir" onPress={() => {signOut();router.replace("/(public)")}} />
            </View>

            {/* FlatList para la lista de ejercicios */}
            <FlatList
                data={exercises}
                renderItem={renderExercise}
                keyExtractor={(item) => item.exerciseId.toString()}
                contentContainerStyle={styles.centralButtonsContainer}
                ListFooterComponent={
                    <TouchableOpacity style={styles.buttonGreen} onPress={() => router.replace("/(exerciseCreate)")}>
                        <FontAwesome name="plus" size={30} color="white" />
                        <Text style={styles.buttonText}>Agregar Ejercicio</Text>
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
        paddingHorizontal: 20,
        alignItems: "center",
        paddingBottom: 120, // Espacio para el menú inferior
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
        padding: 20, // Reducción del padding para que no ocupe demasiado espacio
        marginVertical: 8,
        backgroundColor: "#00875F",
        borderRadius: 6,
        alignItems: "center",
        marginBottom: 20, // Espacio extra para evitar superposición con el menú
    },
    buttonText: {
        color: "#fff",
        paddingLeft: 10,
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
        bottom: 0,
        left: 32,
        right: 32,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
