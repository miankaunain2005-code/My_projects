import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const InputComponents = ({ title, placeholder, value, onChangeText }: { title: string, placeholder: string, value: string, onChangeText: (text: string) => void }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TextInput style={styles.inputcontainer} placeholder={placeholder} value={value} onChangeText={onChangeText} />
        </View >
    )
}
const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "black",
    },
    inputcontainer: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 10,
        fontSize: 18,
        color: "black",
    },
})
export default InputComponents