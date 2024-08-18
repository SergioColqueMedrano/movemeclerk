import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center", // Centra el contenido horizontalmente
        alignItems: "center", // Centra el contenido verticalmente
        gap: 7,
        backgroundColor: "#000",
        padding: 22,
        borderRadius: 16,
        borderColor: "#808080", // Color gris
        borderWidth: 1, // Ancho del borde
    },
    icon: {
        color: "#FFF",
        fontSize: 20,
    },
    text: {
        color: "#FFF",
        fontSize: 16,
        textAlign: "center", // Centra el texto
    }
});
