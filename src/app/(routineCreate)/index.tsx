import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { ButtonExit } from "../../../components/ButtonExit";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";


export default function routineCreate() {
    const {user} = useUser();
    const {signOut} = useAuth();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Crear Rutina</Text>
            

            {/* Aquí añadimos los botones en la parte central */}
            <View style={styles.centralButtonsContainer}>
                

                <TextInput
                    placeholder="Nombre Descripción"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="sexo"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
               <TouchableOpacity style={styles.buttonGreen} onPress={() => router.replace("/(routineHome)")}>
                 <Text style={styles.buttonText}>Crear Rutina</Text>
                </TouchableOpacity>
               
               
               <TouchableOpacity onPress={() => router.replace("/(routineHome)")}>
                    <AntDesign name="arrowleft" size={24} color="green" />
                </TouchableOpacity>



            </View>

            <View style={styles.footer}> {/*Falta las de cada boton y que cambie de color dependiendo de donde se encuentra */}
                <TouchableOpacity onPress={() => router.replace("/(categoryHome)")}>
                    <Entypo name="home" size={24} color="white" />
                </TouchableOpacity>
                
                <TouchableOpacity >
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
    backButton: {
        position: 'absolute',
        top: 40,  // Ajusta esta distancia según sea necesario
        left: 35,  // Ajusta esta distancia según sea necesario
        zIndex: 1,  // Asegura que esté por encima de otros elementos si es necesario
    },
    buttonGreen: {
        flexDirection: 'row',
        
        justifyContent: "center", // Espacia uniformemente los botones
        paddingHorizontal: 16,
        width: 364,
        padding: 30,
        marginVertical: 8,
        backgroundColor: "#00875F",
        borderRadius: 6,
        alignItems: "center",
    },
    header: {
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    textHeader: {
        margin: 30,
        fontSize: 20,
        color: '#fff',
        textAlign: "center",
        fontWeight: 'bold',
    },
    Text: {
        margin: 30,
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
        width: 148,
        height: 148,
        borderRadius: 100,
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
        width: "100%",
        padding: 15,
        marginVertical: 8,
        backgroundColor: "#00875F",
        borderRadius: 6,
        alignItems: "center",
    },
    selectedButton: {
        borderWidth: 2,
        borderColor: "#00B37E", // Color del borde del botón seleccionado
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonTextwhite: {
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
    input: {
        width: '100%',
        padding: 20,
        marginVertical: 5,
        backgroundColor: '#202024', // Color negro para los inputs
        borderRadius: 5,
        color: '#fff',
      },
});
