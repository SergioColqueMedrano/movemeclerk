import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { ButtonExit } from "../../../components/ButtonExit";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useSelector } from 'react-redux';
import UserState from "@/redux/reducers/userReducer";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";

type UserResponse = {
    accountId: number;
    userId: number;
    name: string;
    gender: string;
    birthDate: string;
    profileMediaId: string | null;
    createdAt: string;
    updatedAt: string;
};

export default function Category() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const navigation = useNavigation();
    const [userName, setUserName] = useState<string>("");
    // Assume the user state structure contains email or other metadata
   
    const userId = useSelector((state: RootState) => state.user.userId); // Obtén el userId del estado global



    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await fetch("https://jz420zgh-3000.brs.devtunnels.ms/accounts/5");
                const data: UserResponse = await response.json();
                setUserName(data.name);
            } catch (error) {
                console.error("Error al obtener el nombre del usuario:", error);
            }
        };

        fetchUserName();
    }, [userId]);



    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Image source={user?.imageUrl ? { uri: user.imageUrl } : require('../../../assets/images/avatar.png')} style={styles.image} />

                <View style={styles.textContainer}>
                    <Text style={styles.text}>Hola, {userName}</Text>  {/* Usando userName */}
                    <Text style={styles.name}>{user?.fullName}</Text>
                </View>
                <ButtonExit icon="exit-outline" title="Salir" onPress={() => {signOut();router.replace("/(public)")}} />
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
                <TouchableOpacity onPress={() => router.replace("/(auth)")}>
                    <Entypo name="home" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace("/(category)")}>
                    <FontAwesome5 name="dumbbell" size={24} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace("/(history)")}>
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
