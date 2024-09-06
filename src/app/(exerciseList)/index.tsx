import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { ButtonExit } from "../../../components/ButtonExit";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { Feather, MaterialIcons, Octicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';

export default function exerciseList() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const navigation = useNavigation();

    // Estados para gestionar los dropdowns y checkboxes de cada ejercicio
    const [isOpen1, setIsOpen1] = useState(false);
    const [isChecked1, setIsChecked1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Lista de Ejercicios</Text>

            {/* Botones con dropdowns y checkboxes */}
            <View style={styles.centralButtonsContainer}>
                
                {/* Ejercicio 1 */}
                <View style={styles.button}>                    
                    <Text style={styles.buttonNumber}>Espalda Ejercicio 1</Text>
                    <View style={styles.div}>
                        <TouchableOpacity onPress={() => setIsOpen1(!isOpen1)}>
                            <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsChecked1(!isChecked1)}>
                            <MaterialCommunityIcons
                                name={isChecked1 ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Dropdown de Ejercicio 1 */}
                {isOpen1 && (
                    <View style={styles.dropdown}>
                        <Text style={styles.dropdownText}>Cantidad de repeticiones: 12</Text>
                        <Text style={styles.dropdownText}>Cantidad de series: 3</Text>
                    </View>
                )}

                {/* Ejercicio 2 */}
                <View style={styles.buttonBlack}>                    
                    <Text style={styles.buttonNumber}>Espalda Ejercicio 2</Text>
                    <View style={styles.div}>
                        <TouchableOpacity onPress={() => setIsOpen2(!isOpen2)}>
                            <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsChecked2(!isChecked2)}>
                            <MaterialCommunityIcons
                                name={isChecked2 ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Dropdown de Ejercicio 2 */}
                {isOpen2 && (
                    <View style={styles.dropdown}>
                        <Text style={styles.dropdownText}>Cantidad de repeticiones: 10</Text>
                        <Text style={styles.dropdownText}>Cantidad de series: 4</Text>
                    </View>
                )}

                {/* Ejercicio 3 */}
                <View style={styles.buttonBlack}>                    
                    <Text style={styles.buttonNumber}>Espalda Ejercicio 3</Text>
                    <View style={styles.div}>
                        <TouchableOpacity onPress={() => setIsOpen3(!isOpen3)}>
                            <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsChecked3(!isChecked3)}>
                            <MaterialCommunityIcons
                                name={isChecked3 ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Dropdown de Ejercicio 3 */}
                {isOpen3 && (
                    <View style={styles.dropdown}>
                        <Text style={styles.dropdownText}>Cantidad de repeticiones: 15</Text>
                        <Text style={styles.dropdownText}>Cantidad de series: 3</Text>
                    </View>
                )}

                {/* Botón para agregar ejercicio */}
                <TouchableOpacity style={styles.buttonGreen} onPress={() => router.replace("/(exerciseCreate)")}>
                    <Text style={styles.buttonText}>Agregar Ejercicios</Text>
                </TouchableOpacity>

                {/* Botón de retroceso */}
                <TouchableOpacity onPress={() => router.replace("/(exerciseHome)")}>
                    <AntDesign name="arrowleft" size={24} color="green" />
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.replace("/(categoryHome)")}>
                    <Entypo name="home" size={24} color="white" />
                </TouchableOpacity>
                
                <TouchableOpacity>
                    <MaterialIcons name="bookmark-add" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
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
    buttonNumber: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonBlack: {
        flexDirection: 'row',
        width: "100%",
        padding: 15,
        marginVertical: 8,
        backgroundColor: "#202024",
        borderRadius: 6,
        justifyContent: "space-around",
    },
    div: {
        flexDirection: 'row',
    }, 
    textHeader: {
        margin: 30,
        fontSize: 20,
        color: '#fff',
        textAlign: "center",
        fontWeight: 'bold',
    },
    centralButtonsContainer: {
        justifyContent: "flex-start",
        padding: 30,
        alignItems: "center",
        height: 665,
        backgroundColor: "#121214",
    },
    button: {
        flexDirection: 'row',
        width: "100%",
        padding: 15,
        marginVertical: 8,
        backgroundColor: "#00875F",
        borderRadius: 6,
        justifyContent: "space-around",
    },
    buttonText: {
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
    dropdown: {
        backgroundColor: "#121214",
        padding: 15,
        marginVertical: 8,
        borderRadius: 6,
    },
    dropdownText: {
        color: "#fff",
        fontSize: 14,
        marginBottom: 10,
    }
});
