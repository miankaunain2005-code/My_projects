import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import Buttoncomponent from '../components/buttoncomponent'
import InputComponents from '../components/input-components'
import api from './utiles/api'

const Page = () => {

    const params = useLocalSearchParams()

    const [name, setName] = useState(params?.name || "")
    const [email, setEmail] = useState(params?.email || '')

    const onSave = async () => {

        if (!name || !email) {
            return Alert.alert("Error", "Please fill all fields")
        }

        try {

            if (params.id) {
                const response = await api.put(`/users/${params.id}`, {

                    name,
                    email,
                }

                )
            }
            else {


                const response = await api.post("/users", {
                    name,
                    email,
                })
                console.log("response:", response.data)
            }
            router.navigate("/")

        } catch (error) {
            console.log("ERROR:", error)
        }
    }

    return (
        <View style={styles.container}>

            <Text style={[styles.title, { textAlign: 'center' }]}>
                CRUD APP
            </Text>

            <Text style={styles.title}>
                {params.type} User
            </Text>

            <View style={styles.inputcontainer}>

                <InputComponents
                    title="Name"
                    placeholder="Enter your name"
                    value={name as string}
                    onChangeText={(value: string) => setName(value)}
                />

                <InputComponents
                    title="Email"
                    placeholder="Enter your email"
                    value={email as string}
                    onChangeText={(value: string) => setEmail(value)}
                />

            </View>

            <Buttoncomponent
                title="Save User"
                onPress={onSave}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 20,
        gap: 20,
    },

    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: 'black',
    },

    inputcontainer: {
        backgroundColor: '#fff',
        elevation: 5,
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderRadius: 20,
        minHeight: 450,
        gap: 20,
    },
})

export default Page