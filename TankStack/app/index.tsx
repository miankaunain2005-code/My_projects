import { createTodo, deleteTodo, getTodos, Todo, updateTodo } from "@/api/todo";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
export default function Index() {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  const { data: todos, isPending, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos
  });
  console.log("QUERY:", todos);


  const addMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: (data) => {
      console.log("Todo added successfully", data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  })
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (data) => {
      console.log("Todo deleted successfully", data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  })

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: (data) => {
      console.log("Todo updated successfully", data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  })
  const handleaddTodo = () => {
    addMutation.mutate(newTodo);
    setNewTodo("");
  }


  if (isPending) {
    return <Text>Loading...</Text>
  }
  if (error) {
    return <Text>{error.message}</Text>
  }

  const renderTodo: ListRenderItem<Todo> = ({ item }) => {
    const handleDeleteTodo = () => {
      deleteMutation.mutate(item.id);
    }
    const handleupdateTodo = () => {
      const updateTodo = { ...item, completed: !item.completed }
      updateMutation.mutate(updateTodo);
    }

    return (
      <View style={styles.todoContainer}>
        <Text style={styles.todoText} onPress={handleupdateTodo}>
          {item.todo}
        </Text>
        <View style={styles.todoStatus}>
          <Link
            href={{
              pathname: "/edit",
              params: {
                id: item.id,

              }
            }}
          >
            <TouchableOpacity>
              <Ionicons name="pencil-outline" size={24} color="black" />

            </TouchableOpacity>
          </Link>
          <TouchableOpacity>
            <Ionicons name="trash" size={24} color="black" />
          </TouchableOpacity>

        </View>
      </View>

    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.addTodoContainer}>
        <TextInput placeholder="Add a new todo" style={styles.addtodoText} value={newTodo} onChangeText={setNewTodo} />
        <TouchableOpacity style={styles.addTodoButton} onPress={handleaddTodo}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>

      </View>
      <FlatList
        data={todos}
        renderItem={renderTodo}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,

  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  todoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  todoStatus: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  addTodoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  addtodoText: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#161616",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addTodoButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  }

})