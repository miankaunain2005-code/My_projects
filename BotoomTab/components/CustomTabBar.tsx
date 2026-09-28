import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomTabBar({ state, descriptors, navigation }: any) {
    return (
        <View style={styles.container}>
            {state.routes.map((route: any, index: number) => {
                const isFocused = state.index === index;
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const icon = () => {
                    if (route.name === "index") return "home";
                    if (route.name === "profile") return "person";
                    if (route.name === "setting") return "settings";
                    return "ellipse";
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={[styles.tab, isFocused && styles.activeTab]}
                        activeOpacity={0.8}
                    >
                        <View style={isFocused ? styles.iconWrapperActive : styles.iconWrapper}>
                            <Ionicons
                                name={icon() as any}
                                size={22}
                                color={isFocused ? "#fff" : "#777"}
                            />
                            {route.name === "index" && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>5</Text>
                                </View>
                            )}

                            {route.name === "profile" && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>5</Text>
                                </View>
                            )}
                            {route.name === "setting" && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>5</Text>
                                </View>
                            )}

                        </View>

                        {isFocused && (
                            <Text style={styles.label}>
                                {descriptors[route.key].options.title}
                            </Text>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#0f172a",
        margin: 15,
        borderRadius: 25,
        height: 70,
        alignItems: "center",
        justifyContent: "space-around",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },

    tab: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },

    activeTab: {
        transform: [{ translateY: -10 }],
    },

    iconWrapper: {
        padding: 10,
        borderRadius: 15,
    },

    iconWrapperActive: {
        backgroundColor: "#88898b",
        padding: 12,
        borderRadius: 18,
        shadowColor: "#88898b",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },

    label: {
        fontSize: 12,
        color: "#fff",
        marginTop: 4,
        fontWeight: "600",
    },
    badge: {
        position: "absolute",
        top: -5,
        right: 7,
        backgroundColor: "#835282",
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
    },

    badgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
});