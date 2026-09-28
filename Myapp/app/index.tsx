import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { createMMKV } from "react-native-mmkv";

type User = {
  name: string;
  age: string;
};

const storage = createMMKV();

export default function Index() {
  const [open, setOpen] = useState(false);

  const [userdata, setuserdata] = useState<User[]>([]);

  const [userinfo, setuserinfo] = useState<User>({
    name: "",
    age: "",
  });

  useEffect(() => {
    const data = storage.getString("userdata");

    if (data) {
      setuserdata(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    storage.set("userdata", JSON.stringify(userdata));
  }, [userdata]);

  const onAdd = () => {
    if (!userinfo.name || !userinfo.age) {
      return alert("Please fill all fields");
    }

    setuserdata([...userdata, userinfo]);

    setuserinfo({
      name: "",
      age: "",
    });

    setOpen(false);
  };

  const onDelete = (index: number) => {
    const updatedData = userdata.filter((_, i) => i !== index);

    setuserdata(updatedData);

    storage.set("userdata", JSON.stringify(updatedData));
  };

  const handleInputChange = (
    field: keyof User,
    value: string
  ) => {
    setuserinfo({
      ...userinfo,
      [field]: value,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        MMKV User Storage
      </Text>

      <Text style={styles.subHeading}>
        Total Users: {userdata.length}
      </Text>

      <Pressable
        style={styles.addBtn}
        onPress={() => setOpen(true)}
      >
        <Text style={styles.btnText}>
          + Add User
        </Text>
      </Pressable>

      <FlatList
        data={userdata}
        keyExtractor={(_, index) =>
          index.toString()
        }
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.age}>
                Age: {item.age}
              </Text>
            </View>

            <Pressable
              style={styles.deleteBtn}
              onPress={() =>
                onDelete(index)
              }
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Delete
              </Text>
            </Pressable>
          </View>
        )}
      />

      <Modal
        visible={open}
        animationType="slide"
        transparent
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              Add New User
            </Text>

            <TextInput
              placeholder="Enter Name"
              placeholderTextColor="#888"
              style={styles.input}
              value={userinfo.name}
              onChangeText={(text) =>
                handleInputChange(
                  "name",
                  text
                )
              }
            />

            <TextInput
              placeholder="Enter Age"
              placeholderTextColor="#888"
              keyboardType="numeric"
              style={styles.input}
              value={userinfo.age}
              onChangeText={(text) =>
                handleInputChange(
                  "age",
                  text
                )
              }
            />

            <Pressable
              style={styles.saveBtn}
              onPress={onAdd}
            >
              <Text style={styles.btnText}>
                Save User
              </Text>
            </Pressable>

            <Pressable
              style={styles.cancelBtn}
              onPress={() =>
                setOpen(false)
              }
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  heading: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },

  subHeading: {
    color: "#999",
    marginTop: 5,
    marginBottom: 25,
  },

  addBtn: {
    backgroundColor: "#5B5EF8",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  age: {
    color: "#bbb",
    marginTop: 4,
  },

  deleteBtn: {
    backgroundColor: "#ff4444",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20,
  },

  modal: {
    backgroundColor: "#1E1E1E",
    borderRadius: 20,
    padding: 20,
  },

  modalTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#2A2A2A",
    color: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
  },

  saveBtn: {
    backgroundColor: "#5B5EF8",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  cancelBtn: {
    backgroundColor: "#444",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
});