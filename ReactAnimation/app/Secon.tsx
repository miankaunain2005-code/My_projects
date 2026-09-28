import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Second() {
    return (
        <View style={styles.container}>

            {/* TOP SUCCESS ANIMATION */}
            <LottieView
                source={require("@/app/assets/lottie/done.json")}
                autoPlay
                loop
                style={styles.animation}
            />

            {/* TITLE */}
            <Text style={styles.title}>Success 🎉</Text>

            <Text style={styles.subtitle}>
                You have successfully completed the process. Now explore your dashboard.
            </Text>

            {/* STATS BOX */}
            <View style={styles.cardRow}>

                <View style={styles.card}>
                    <Text style={styles.cardNumber}>12+</Text>
                    <Text style={styles.cardLabel}>Projects</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardNumber}>5🌟</Text>
                    <Text style={styles.cardLabel}>Rating</Text>
                </View>

            </View>

            {/* BUTTONS */}
            <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => router.back()}
            >
                <Text style={styles.btnText}>Go Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => router.push("/")}
            >
                <Text style={styles.secondaryText}>Go Home</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0B1220",
        alignItems: "center",
        padding: 20,
        justifyContent: "center",
    },

    animation: {
        width: 220,
        height: 220,
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 10,
    },

    subtitle: {
        color: "#94A3B8",
        textAlign: "center",
        fontSize: 15,
        marginTop: 10,
        lineHeight: 22,
    },

    cardRow: {
        flexDirection: "row",
        marginTop: 30,
        gap: 15,
    },

    card: {
        width: 120,
        height: 90,
        backgroundColor: "#111C33",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },

    cardNumber: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#3B82F6",
    },

    cardLabel: {
        color: "#94A3B8",
        marginTop: 5,
    },

    primaryBtn: {
        marginTop: 30,
        backgroundColor: "#3B82F6",
        paddingVertical: 14,
        paddingHorizontal: 50,
        borderRadius: 12,
        width: "100%",
        alignItems: "center",
    },

    btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    secondaryBtn: {
        marginTop: 12,
        borderWidth: 1,
        borderColor: "#334155",
        paddingVertical: 14,
        borderRadius: 12,
        width: "100%",
        alignItems: "center",
    },

    secondaryText: {
        color: "#CBD5E1",
        fontSize: 16,
    },
});