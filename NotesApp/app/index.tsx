import { router } from "expo-router";
import * as Updates from "expo-updates";
import React from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../redux/notesSlice";

export default function Home() {
  const notes = useSelector((state: any) => state.notes);
  const dispatch = useDispatch();

  const checkForUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      Alert.alert("Check Result", JSON.stringify(update));
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        Alert.alert("Downloaded!", "Ab reload ho raha hai...");
        await Updates.reloadAsync();
      }
    } catch (e) {
      Alert.alert("Error", String(e));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: "#f5f6fa" }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 10,
          color: "#294473",
        }}
      >
        📝 My Notes App
      </Text>

      {/* <Text selectable style={{ fontSize: 12, color: "gray", marginBottom: 5 }}>
        Runtime: {Updates.runtimeVersion} | Update ID:{" "}
        {Updates.updateId ?? "embedded"}
      </Text>

      <Pressable
        onPress={checkForUpdate}
        style={{
          backgroundColor: "#2196F3",
          padding: 10,
          borderRadius: 8,
          marginBottom: 15,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Check for Update
        </Text>
      </Pressable> */}

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 15,
              marginBottom: 10,
              borderRadius: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.text}</Text>

            <Pressable onPress={() => dispatch(deleteNote(item.id))}>
              <Text style={{ color: "red", fontWeight: "bold" }}>Delete</Text>
            </Pressable>
          </View>
        )}
      />

      <Pressable
        onPress={() => router.push("/add")}
        style={{
          backgroundColor: "#4CAF50",
          padding: 15,
          borderRadius: 12,
          position: "absolute",
          bottom: 30,
          right: 20,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>+ Add Note</Text>
      </Pressable>
    </SafeAreaView>
  );
}
