import { View, Image, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ChatComponent = ({ item, username }) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState({});
  console.log("item : " + JSON.stringify(item));

  useLayoutEffect(() => {
    setMessages(item.messages[item.messages.length - 1]);
    console.log("item : " + JSON.stringify(item));
    async function getUserName() {}
    getUserName();
  }, []);

  const handleNavigation = () => {
    navigation.navigate("Messaging", {
      id: item.id,
      name: item.name,
    });
  };

  return username == item.name || username == item.sender ? (
    <Pressable style={styles.cchat} onPress={handleNavigation}>
      {/* <Ionicons
				name='person-circle-outline'
				size={45}
				color='black'
				style={styles.cavatar}
			/> */}
      <View style={{ width: 65, height: 65, marginRight: 15 }}>
        <Image
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 100,
          }}
          source={require("../images/myaccount.png")}
        />
      </View>
      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>
            {item.name == username ? item.sender : item.name}
          </Text>

          <Text style={styles.cmessage}>
            {messages?.text ? messages.text : "Tap to start chatting"}
          </Text>
        </View>
        <View>
          <Text style={styles.ctime}>
            {messages?.time ? messages.time : "now"}
          </Text>
        </View>
      </View>
    </Pressable>
  ) : (
    ""
  );
};

export default ChatComponent;
