import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
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

export default function ExerciseHome() {
    const {user} = useUser();
    const {signOut} = useAuth();
    const navigation = useNavigation();
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: user?.imageUrl}} style={styles.image}/>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Hola,</Text>
                    <Text style={styles.name}>{user?.fullName}</Text>
                </View>
                <ButtonExit icon="exit-outline" title="Salir" onPress={() => signOut()} />   {/*TODO: Deslogear cuentas de la aplicacion MOVEME*/}
            </View>

            {/* Aquí añadimos los botones en la parte central */}
            <View style={styles.centralButtonsContainer}>
               
                 <View style={styles.button}>                    
                    <Text style={styles.buttonNumber}>Ejercicio 1</Text>
                    <View style={styles.div}>
                        <TouchableOpacity onPress={() => router.replace("/(exerciseEdit)")}>
                            <Octicons name="pencil" size={24} color="white" />
                        </TouchableOpacity >
                        <TouchableOpacity onPress={() => router.replace("/(exerciseDelete)")}>
                            <Entypo name="cross" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.button}>                    
                    <Text style={styles.buttonNumber}>Ejercicio 2</Text>
                    <View style={styles.div}>
                        <TouchableOpacity>
                            <Octicons name="pencil" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Entypo name="cross" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.button}>                    
                    <Text style={styles.buttonNumber}>Ejercicio 3</Text>
                    <View style={styles.div}>
                        <TouchableOpacity>
                            <Octicons name="pencil" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Entypo name="cross" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                
                
                <TouchableOpacity style={styles.buttonGreen} onPress={() => router.replace("/(exerciseCreate)")}>
                <FontAwesome name="plus" size={30} color="white" />  
                 <Text style={styles.buttonText}>Agregar Rutina</Text>
                </TouchableOpacity>
                
            </View>

            <View style={styles.footer}> {/*Falta las de cada boton y que cambie de color dependiendo de donde se encuentra */}
                <TouchableOpacity >
                    <Entypo name="home" size={24} color="white" />
                </TouchableOpacity>
                
                <TouchableOpacity >
                    <MaterialIcons name="bookmark-add" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity >
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
        
        justifyContent: "center", // Espacia uniformemente los botones
        paddingHorizontal: 16,
        width: 364,
        padding: 30,
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
        padding: 15,
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
