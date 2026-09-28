import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import api from '../app/utiles/api'
// ya params isli type add ya edit krna h wo bhej do add py click huga tp screen py add ajye ga edit hu to edit ajye ga
const Crudcard = ({ name, email, id, ondelete }: { name: string, email: string, id: string, ondelete: () => void }) => {

    const deleteitem = async () => {
        try {
            await api.delete(`/users/${id}`)

            ondelete()

        }
        catch (error) {
            console.log("ERROR:", error)
        }
    }
    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
            <View style={styles.buttoncontainer}>
                <TouchableOpacity style={styles.button} onPress={() => router.navigate({
                    pathname: "/add-edit-page",
                    params: {
                        type: "Edit",
                        name,
                        email,
                        id,
                    }
                })}>
                    <Text style={styles.buttontext}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={deleteitem}>
                    <Text style={styles.buttontext}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({

    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 5,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: "#000"

    },

    email: {
        fontSize: 16,
        color: "gray",
        fontWeight: 500
    },
    button: {
        backgroundColor: '#00000024',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },

    buttontext: {
        fontSize: 16,
        color: "black",
        fontWeight: 500
    },
    buttoncontainer: {
        flexDirection: 'row',
        gap: 10,
    }



})
export default Crudcard