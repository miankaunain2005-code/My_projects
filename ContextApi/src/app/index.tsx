import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CountContext } from './contextapi/CountContex'
import Second from './second'

const First = () => {

  const { increment } = useContext(CountContext)
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={increment}>
        <Text style={styles.buttonText}>Add first components</Text>
      </TouchableOpacity>
      <Second />
    </View>

  )
}

export default First
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,

  },
  button: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});