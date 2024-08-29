import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { ButtonExit } from "../../../components/ButtonExit";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";

export default function Profile() {
    const {user} = useUser();
    const {signOut} = useAuth();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Perfil</Text>
            

            {/* Aquí añadimos los botones en la parte central */}
            <View style={styles.centralButtonsContainer}>
                <TouchableOpacity style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="green" />
                </TouchableOpacity>
                <View style={styles.header}>
                    <Image source={{ uri: user?.imageUrl}} style={styles.image}/>
                </View>
                <Text style={styles.buttonText}>Cambiar Foto</Text>

                <TextInput
                    placeholder="Nombre"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="E-mail"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Text style={styles.Text}>Actualizar Contraseña</Text>
                <TextInput
                    placeholder="Contraseña actual"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    keyboardType="visible-password"
                    autoCapitalize="none"
                    
                />
                <TextInput
                    placeholder="Contraseña nueva"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                 <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonTextwhite}>Actualizar</Text>
                </TouchableOpacity>
                    
            </View>

            <View style={styles.footer}> {/*Falta las de cada boton y que cambie de color dependiendo de donde se encuentra */}
                <TouchableOpacity >
                    <Entypo name="home" size={24} color="green" />
                </TouchableOpacity>
                <TouchableOpacity >
                    <FontAwesome5 name="dumbbell" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity >
                    <FontAwesome5 name="history" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity >
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
    backButton: {
        position: 'absolute',
        top: 40,  // Ajusta esta distancia según sea necesario
        left: 35,  // Ajusta esta distancia según sea necesario
        zIndex: 1,  // Asegura que esté por encima de otros elementos si es necesario
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
        color: "#00B37E",
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
