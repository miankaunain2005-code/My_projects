import { StyleSheet, Text, View } from 'react-native';

import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import Buttoncomponent from '../components/buttoncomponent';
import Crudcard from '../components/crudcard';
import api from './utiles/api';

export default function Index() {
  const [users, setUsers] = useState([])
  const fetchUser = async () => {

    try {

      const response = await api.get("/users")

      console.log("response:", response.data)

      setUsers(response.data)

    } catch (error: any) {

      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      )
    }
  }


  useEffect(() => {
    // Fetch users from API and set to state
    fetchUser();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { textAlign: 'center' }]}> CRUD APP</Text>
      <Text style={styles.title}>Users</Text>
      {
        users.map((user: any, index) => {

          return <Crudcard key={index} name={user.name} email={user.email} id={user?._id} ondelete={fetchUser} />

        }

        )
      }
      <Buttoncomponent title="Add User" onPress={() => router.navigate(
        {
          pathname: "/add-edit-page", params: {
            type: "Add",
          }

        }
      )} />
    </View>

  );
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

});
