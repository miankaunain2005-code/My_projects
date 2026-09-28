import { StyleSheet, Text, View } from "react-native";

export default function Setting() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>⚙️ Settings Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0b1220",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },
});