import { getTodoid, updateTodo } from '@/api/todo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Edit = () => {
    const [todo, settodo] = useState("")
    const { id } = useLocalSearchParams();
    const queryClient = useQueryClient();

    const { data, isPending, error } = useQuery({

        queryKey: ["todos", id],
        queryFn: () => getTodoid(id.toString())
    })
    useEffect(() => {
        if (data) {
            settodo(data.todo)
        }
    }, [data])


    const editmutation = useMutation({
        mutationFn: updateTodo,
        onSuccess: (data) => {
            console.log("sucess", data)
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            router.back()
        } 
    })

    const handleUpdate = () => {
        editmutation.mutate({
            id: id.toString(),
            todo,
            completed: false,
        })

    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={todo} onChangeText={settodo} />
            <TouchableOpacity onPress={handleUpdate}>
                <Text>

                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Edit

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        margin: 10,
        width: "80%"
    }
})