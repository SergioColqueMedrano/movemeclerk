import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
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

export default function History() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const navigation = useNavigation();
    
    // Estado del historial de ejercicios (Ejemplo de datos)
    const exerciseHistory = [
        { id: '1', date: '26.08.22', group: 'Espaldas', exercise: 'Remada unilateral', time: '08:56' },
        { id: '2', date: '26.08.22', group: 'Costas', exercise: 'Remada unilateral', time: '08:32' },
        { id: '3', date: '26.08.22', group: 'Costas', exercise: 'Puxada frontal', time: '11:24' },
    ];

    // Renderizar cada item del historial
    const renderExerciseItem = ({ item }) => (
        <View style={styles.exerciseItem}>
            <Text style={styles.date}>{item.date}</Text>
            <View style={styles.exerciseDetails}>
                <Text style={styles.group}>{item.group}</Text>
                <Text style={styles.exercise}>{item.exercise}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Image source={user?.imageUrl ? { uri: user.imageUrl } : require('../../../assets/images/avatar.png')} style={styles.image} />  
                    <Text style={styles.text}>Historial de Ejercicios</Text>
                    <ButtonExit icon="exit-outline" title="Salir" onPress={() => {signOut();router.replace("/(public)")}} />    
            </View>
            <View style={styles.centralButtonsContainer}>
                {/* Lista del historial de ejercicios */}
                <FlatList
                    data={exerciseHistory}
                    keyExtractor={(item) => item.id}
                    renderItem={renderExerciseItem}
                    contentContainerStyle={styles.historyContainer}
                />

                <TouchableOpacity >
                        <AntDesign name="arrowleft" size={24} color="green" />
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.replace("/(auth)")}>
                    <Entypo name="home" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace("/(category)")}>
                    <FontAwesome5 name="dumbbell" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace("/(history)")}>
                    <FontAwesome5 name="history" size={24} color="green" />
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
    centralButtonsContainer: {
        justifyContent: "flex-start",
        padding: 10,
        alignItems: "center",
        height: 665,
        backgroundColor: "#121214",
    },
    header: {
        flexDirection: "row",
        padding: 32,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    textContainer: {
        
        alignItems: "center",
        
    },
    text: {
        fontSize: 16,
        color: '#fff',
        textAlign: "left",
    },
    historyContainer: {
        paddingHorizontal: 5,
        paddingTop: 20,
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 50,
        backgroundColor: "#323238",
        borderWidth: 4,
        borderColor: "#323238",
    },
    exerciseItem: {
        backgroundColor: '#323238',
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
    },
    date: {
        fontSize: 12,
        color: '#aaa',
        marginBottom: 8,
    },
    exerciseDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    group: {
        fontSize: 14,
        color: '#fff',
        fontWeight: "bold",
    },
    exercise: {
        fontSize: 14,
        color: '#fff',
    },
    time: {
        fontSize: 12,
        color: '#aaa',
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
