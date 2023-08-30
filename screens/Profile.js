import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook
import { Feather } from "@expo/vector-icons";
import Modal from "../component/Modal";
import ChatComponent from "../component/ChatComponent";
import socket from "../utils/socket";
import { styles } from "../utils/styles";

const Profile = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@username");
      await AsyncStorage.removeItem("@jwt");
      await AsyncStorage.removeItem("@role");
      await AsyncStorage.removeItem("@id");

      navigation.navigate("Login");
    } catch (e) {
      console.error("Error while logging out:", e);
    }
  };
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [profileUsername, setUser] = useState("");

  const getUsername = async () => {
    try {
      const profileUsername = await AsyncStorage.getItem("@username");
      console.log(profileUsername);
      if (profileUsername !== null) {
        setUser(profileUsername);
      }
    } catch (e) {
      console.error("Error while loading username!");
    }
  };

  getUsername();

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF",
        flex: 1,
        // padding: 10,
        position: "relative",
      }}
    >
      <View
        style={{
          zIndex: -1,
          height: "30%",
          backgroundColor: "#1f2067",
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "33%",
              height: "23%",
              marginTop: 150,
            }}
          >
            <Image
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 100,
              }}
              source={require("../images/bxs_camera.png")}
            />
            <Pressable //
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                // borderWidth: 3,
                // borderColor: "#fff",
                width: "33%",
                height: "33%",
                borderRadius: 100,
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../images/EditProfile.png")}
              />
            </Pressable>
          </View>
          <Text
            style={{
              marginTop: 18,
              textAlign: "center",
              fontFamily: "Roboto",
              fontSize: 23,
            }}
          >
            {profileUsername}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 45, color: "#8F8F8F" }}>
            brucenelson@yourcompany.com
          </Text>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              height: "auto",
              justifyContent: "space-around",
              flexDirection: "column",
            }}
          >
            <Pressable
              onPress={() => navigation.navigate("AccountSettings")}
              style={{
                flexDirection: "row",
                width: "80%",
                //   paddingHorizontal: "21%",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 14,
                flexDirection: "row",
                //   backgroundColor: "#FAE6E7",
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 25, height: 25, marginLeft: 5 }}
                  source={require("../images/settings.png")}
                />
                <Text
                  style={{ fontSize: 16, marginLeft: 10, textAlign: "center" }}
                >
                  Account Settings
                </Text>
              </View>
              <Image
                resizeMode="contain"
                style={{ width: 16, height: 16, marginRight: 5 }}
                source={require("../images/chevron_right.png")}
              />
            </Pressable>
            {/* ------To uncomment when we build the Announcements section-------- */}
            {/* <View
              style={{
                flexDirection: "row",
                width: "80%",
                //   paddingHorizontal: "21%",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 14,
                flexDirection: "row",
                //   backgroundColor: "#FAE6E7",
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 23, height: 23, marginLeft: 7 }}
                  source={require("../images/bookmark.png")}
                />
                <Text
                  style={{ fontSize: 16, marginLeft: 10, textAlign: "center" }}
                >
                  Company Announcements
                </Text>
              </View>
              <Image
                resizeMode="contain"
                style={{ width: 16, height: 16, marginRight: 5 }}
                source={require("../images/chevron_right.png")}
              />
            </View> */}
            <Pressable onPress={handleLogout}>
              <View
                style={{
                  paddingHorizontal: "33%",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 14,
                  flexDirection: "row",
                  marginTop: "30%",
                  backgroundColor: "#FAE6E7",
                  borderRadius: 5,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 25, height: 25 }}
                  source={require("../images/logout.png")}
                />
                <Text
                  style={{
                    color: "#CF0210",
                    fontSize: 16,
                    fontWeight: "500",
                    marginLeft: 10,
                  }}
                >
                  Logout
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
