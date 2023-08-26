import React, { useState, useLayoutEffect, useEffect } from "react";
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
	Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from "@expo/vector-icons";
import Modal from "../component/Modal";
import ChatComponent from "../component/ChatComponent";
import socket from "../utils/socket";
import { styles } from "../utils/styles";
import { TextInput } from 'react-native-paper';
import TextField from '../component/inputField';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
const DATA = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'First Item',
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Second Item',
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d72',
		title: 'Third Item',
	},
];
const Chat = () => {
	const [visible, setVisible] = useState(false);
	const [rooms, setRooms] = useState([]);
	const [searchedUsers, setSearchedUsers] = useState([]);
	const [search, setSearch] = useState('');

	const [department, setDepartment] = useState('');

	const Item = ({ title }) => (
		<View style={style.item}>
			<Ionicons
				name='person-circle-outline'
				size={45}
				color='black'
				style={styles.cavatar}
			/>
			<Text style={styles.title}>{title}</Text>
		</View>
	);

	useLayoutEffect(() => {
		function fetchGroups() {
			fetch("http://192.168.0.103:4000/api")
				.then((res) => res.json())
				.then((data) => setRooms(data))
				.catch((err) => console.error(err));
		}
		fetchGroups();
	}, []);

	useEffect(() => {
		socket.on("roomsList", (rooms) => {
			setRooms(rooms);
		});
	}, [socket]);

	useEffect(() => {
		async function getValue() {
			const value = await AsyncStorage.getItem("@department");
			if (value) {
				setDepartment(value)
			}
		}
		getValue()

	});

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			axios.get(`http://192.168.0.103:3001/user?department=${department}&query=${search}`).then((res) => {
				console.log(res.data)
			})
		}, 500)

		return () => clearTimeout(delayDebounceFn)
	}, [search]);

	const handleCreateGroup = () => setVisible(true);

	return (
		<SafeAreaView style={styles.chatscreen}>
			<View style={styles.chattopContainer}>
				<View style={styles.chatheader}>
					<Text style={styles.chatheading}>Chats</Text>
					<Pressable onPress={handleCreateGroup}>
						<Feather name='edit' size={24} color='green' />
					</Pressable>
				</View>
			</View>

			<View>
				<Text style={styles.pageHeading}>Welcome to your workspace</Text>
				<Text style={styles.pageSubHeading}>Chats moved to workspace are snoozed after your work hours.
					<Text style={{ fontWeight: '600' }}>Manage work hours</Text></Text>
			</View>
			<View style={{ marginTop: 13 }}>
				<TextField
					style={{ marginBottom: 5 }}
					label="Search by name"
					onChangeText={text => {
						setSearch(text);
					}}

					right={
						<TextInput.Icon
							name={() => (

								<TouchableOpacity onPress={() => {
									setShowPassword(!showPassword)
								}}>
									<Image resizeMode="contain"
										style={{ width: 25 }} source={require('../images/filter.png')} />
								</TouchableOpacity>

							)}
						/>
					}
				/>
				<View style={styles.optionBox}>
					<FlatList
						data={DATA}
						renderItem={({ item }) => <Item title={item.title} />}
						keyExtractor={item => item.id}
					/>
				</View>
			</View>

			<View style={styles.chatlistContainer}>
				{rooms.length > 0 ? (
					<FlatList
						data={rooms}
						renderItem={({ item }) => <ChatComponent item={item} />}
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
	);
};
const style = StyleSheet.create({
	item: {
		display: 'flex',
		flexDirection: 'row'
	}
});


export default Chat;


