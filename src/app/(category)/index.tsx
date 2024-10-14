import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { ButtonExit } from "../../../components/ButtonExit";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useSelector } from 'react-redux'; // Asegúrate de importar useSelector

export default function Category() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const navigation = useNavigation();
    
    // Utilizando useSelector para obtener userName del estado de Redux
    const userName = useSelector((state) => state.user.userData.userName) || ''; // Establecer un valor por defecto

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: user?.imageUrl }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Hola, {userName}</Text>
                    <Text style={styles.name}>{user?.fullName}</Text>
                </View>
                <ButtonExit icon="exit-outline" title="Salir" onPress={() => signOut()} />
            </View>

            {/* Aquí añadimos los botones en la parte central */}
            <View style={styles.centralButtonsContainer}>
                <TouchableOpacity style={[styles.button, styles.selectedButton]} onPress={() => router.replace("/(auth)")}>
                    <Text style={styles.buttonText}>HIPERTROFIA</Text>
                </TouchableOpacity>
                <Text style={styles.text}>¿Cuántos días piensas entrenar por semana?</Text>
                <TouchableOpacity style={[styles.button]} onPress={() => router.replace("/(routine)")}>
                    <Text style={styles.buttonNumber}>UNO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonNumber}>DOS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonNumber}>TRES</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button]}>
                    <Text style={styles.buttonNumber}>CUATRO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonNumber}>CINCO</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <AntDesign name="arrowleft" size={24} color="green" />
                </TouchableOpacity>
            </View>

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
        height: 665,
        backgroundColor: "#121214",
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
        borderColor: "#00B37E", // Color del borde del botón seleccionado
    },
    buttonText: {
        color: "#00B37E",
        fontSize: 16,
        fontWeight: "bold"
    },
    buttonNumber: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
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
