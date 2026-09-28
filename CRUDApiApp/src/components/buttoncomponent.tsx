import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Buttoncomponent = ({ title, onPress }: { title: string; onPress: () => void }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#3e3838",
        alignItems: 'center',
        paddingVertical: 20,
        borderRadius: 20,
    },
    text: {
        fontWeight: '700',
        fontSize: 21,
        color: 'white',
    },

})
export default Buttoncomponent