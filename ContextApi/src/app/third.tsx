import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CountContext } from './contextapi/CountContex'

const Third = () => {
  const { count } = useContext(CountContext)

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>SecondComponents</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{count}</Text>

    </View>
  )
}

export default Third
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
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});