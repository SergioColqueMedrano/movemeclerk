import { StyleSheet, Text, View } from "react-native";



export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hola, Rodrigo Gonzales</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
    },
 }
)