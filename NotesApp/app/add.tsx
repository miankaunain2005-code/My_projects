import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { addNote } from "../redux/notesSlice";

export default function Add() {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const onSave = () => {
        if (text.trim() === "") 
            return;

        dispatch(addNote(text));
        setText("");
        router.back();
    };

    return (
        <View style={{
            flex: 1,
            padding: 20,
            justifyContent: "center",
            backgroundColor: "#f5f6fa"
        }}>

            <Text style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 20
            }}>
                Add New Note
            </Text>

            <TextInput
                placeholder="Write your note..."
                value={text}
                onChangeText={setText}
                style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 20
                }}
            />

            <Pressable
                onPress={onSave}
                style={{
                    backgroundColor: "#4CAF50",
                    padding: 15,
                    borderRadius: 10,
                    alignItems: "center"
                }}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                    Save Note
                </Text>
            </Pressable>

        </View>
    );
}