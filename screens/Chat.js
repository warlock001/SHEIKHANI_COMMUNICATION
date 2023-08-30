import React, { useState, useLayoutEffect, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import {
  ImageBackground,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  FlatList,
  Image,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import Modal from "../component/Modal";
import ChatComponent from "../component/ChatComponent";
import socket from "../utils/socket";
import { styles } from "../utils/styles";
import { TextInput } from "react-native-paper";
import TextField from "../component/inputField";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function Chat({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchedUsersVisible, setSearchedUsersVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");

  const [department, setDepartment] = useState("");

  const handleNavigation = (id, name) => {
    navigation.navigate("Messaging", {
      id: id,
      name: name,
    });
  };

  const Item = ({ props }) => (
    <TouchableOpacity
      onPress={() => {
        handleNavigation(props.id, props.title);
      }}
    >
      <View style={style.item}>
        <Ionicons
          name="person-circle-outline"
          size={60}
          color="black"
          style={styles.cavatar}
        />
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );

  // useFocusEffect(
  // 	React.useCallback(() => {
  // 		function fetchGroups() {
  // 			fetch("http://2:4000/api")
  // 				.then((res) => res.json())
  // 				.then((data) => {
  // 					setRooms(data)
  // 					console.log(data)
  // 				})
  // 				.catch((err) => console.error(err));
  // 		}
  // 		fetchGroups();
  // 	}, [])
  // )

  useFocusEffect(
    React.useCallback(() => {
      socket.on("roomsList", async (rooms) => {
        setRooms(rooms);
        console.log("socket rooms : " + JSON.stringify(rooms));
        await AsyncStorage.setItem("@rooms", JSON.stringify(rooms));
      });
    })
  );

  useEffect(() => {
    async function getRooms() {
      let rooms = await AsyncStorage.getItem("@rooms");
      rooms = JSON.parse(rooms);
      console.log("rooms :" + JSON.stringify(rooms));
      setRooms(rooms ? rooms : []);
    }
    getRooms();
  }, []);

  useEffect(() => {
    async function getValue() {
      const value = await AsyncStorage.getItem("@department");
      if (value) {
        setDepartment(value);
      }

      const user = await AsyncStorage.getItem("@username");
      if (user) {
        setUsername(user);
      }
    }
    getValue();
  });

  useEffect(() => {
    async function getUsers() {
      const department = await AsyncStorage.getItem("@department");
      axios
        .get(
          `http://52.53.197.201:3001/user?department=${department}&query=${search}`
        )
        .then((res) => {
          // console.log(res.data.user)
          setSearchedUsers(res.data.user);
        });
    }

    getUsers();
  }, [search]);

  const handleCreateGroup = () => setVisible(true);

  return (
    <TouchableWithoutFeedback accessible={false}>
      <SafeAreaView style={styles.chatscreen}>
        <View>
          <Text style={styles.pageHeading}>All Chats</Text>
          <Text style={styles.pageSubHeading}>
            You can check your recent & new chats here
            {/* <Text style={{ fontWeight: "600" }}>Manage work hours</Text> */}
          </Text>
        </View>
        <View style={{ marginTop: 13 }}>
          <KeyboardAvoidingView>
            <TextField
              onFocus={() => {
                setSearchedUsersVisible(true);
              }}
              onBlur={() => setSearchedUsersVisible(false)}
              style={{ marginBottom: 5 }}
              label="Search by name"
              onChangeText={(text) => {
                setSearch(text);
              }}
              right={
                <TextInput.Icon
                  name={() =>
                    searchedUsersVisible ? (
                      <Pressable onPress={Keyboard.dismiss}>
                        <Image
                          resizeMode="contain"
                          style={{ width: 25 }}
                          source={require("../images/close.png")}
                        />
                      </Pressable>
                    ) : (
                      <Image
                        resizeMode="contain"
                        style={{ width: 25 }}
                        source={require("../images/search.png")}
                      />
                    )
                  }
                />
              }
            />
          </KeyboardAvoidingView>
          <View
            style={[
              styles.optionBox,
              { display: searchedUsersVisible ? "flex" : "none" },
            ]}
          >
            {/* <Text style={{ marginBottom: 10 }}>Search Users</Text> */}
            <FlatList
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={true}
              data={searchedUsers}
              renderItem={({ item }) => (
                <Item props={{ title: item.firstName, id: item._id }} />
              )}
              keyExtractor={(item) => item._id}
            />
          </View>
        </View>

        <View
          style={[
            styles.chatlistContainer,
            { display: searchedUsersVisible ? "none" : "flex" },
          ]}
        >
          {rooms.length > 0 ? (
            <FlatList
              extraData={rooms}
              data={rooms}
              renderItem={({ item }) => (
                <ChatComponent item={item} username={username} />
              )}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <View style={styles.chatemptyContainer}>
              <Text style={styles.chatemptyText}>No rooms created!</Text>
              <Text>Click the icon above to create a Chat room</Text>
            </View>
          )}
        </View>
        {visible ? <Modal setVisible={setVisible} /> : ""}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
const style = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingLeft: 5,
  },
});
