import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../utils/styles";

export default function MessageComponent({ item, user }) {
  const status = item.user !== user;

  return (
    <View>
      <View
        style={
          status
            ? [styles.mmessageWrapper]
            : [styles.mmessageWrapper, { alignItems: "flex-end" }]
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {status ? (
            <Ionicons
              name="person-circle-outline"
              size={30}
              color="black"
              style={[styles.mavatar, { marginTop: "auto" }]}
            />
          ) : (
            ""
          )}

          <View
            style={
              status
                ? [styles.mmessage, { borderBottomRightRadius: 10 }]
                : [
                    styles.mmessage,
                    { backgroundColor: "#1F2067", borderBottomLeftRadius: 10 },
                  ]
            }
          >
            <Text style={status ? [{ color: "#000" }] : [{ color: "#FFF" }]}>
              {item.text}
            </Text>
            <Text
              style={
                status
                  ? [
                      {
                        position: "absolute",
                        bottom: 0,
                        right: 7,
                        fontSize: 10,
                        fontWeight: "400",
                        color: "#1F2067",
                      },
                    ]
                  : [
                      {
                        position: "absolute",
                        bottom: 0,
                        right: 7,
                        fontSize: 10,
                        fontWeight: "400",
                        color: "#fff",
                      },
                    ]
              }
            >
              {item.time}
            </Text>
          </View>
          {status ? (
            ""
          ) : (
            <Ionicons
              name="person-circle-outline"
              size={30}
              color="black"
              style={(styles.mavatar2, [, { marginTop: "auto" }])}
            />
          )}
        </View>
      </View>
    </View>
  );
}
