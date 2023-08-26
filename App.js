import React, { useEffect, useState } from 'react';
import {
	ImageBackground,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	Alert,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native';
//👇🏻 app screens
import Login from "./screens/Login";
import Messaging from "./screens/Messaging";
import Chat from "./screens/Chat";
import OnBoarding from './screens/onBoarding';

//👇🏻 React Navigation configurations
import {
	CommonActions,
	NavigationContainer,
	useFocusEffect,
} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//👇🏻 React libraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './utils/styles';
import Home from './screens/Home';







const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function MyTabBar({ state, descriptors, navigation }) {
	console.log(descriptors)
	return (
		<View style={{ flexDirection: 'row', height: 70, alignItems: 'center', justifyContent: 'space-evenly' }}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
					>
						{isFocused ?
							<Image resizeMode="contain"
								style={{ width: 25 }}
								source={

									label == 'Workspace' ? require('./images/workspace.png')
										: label == 'Groups' ? require('./images/groups.png')
											: label == 'Chats' ? require('./images/chats.png')
												: require('./images/myaccount.png')

								} /> : <Image resizeMode="contain"
									style={{ width: 25 }}
									source={

										label == 'Workspace' ? require('./images/workspace_inactive.png')
											: label == 'Groups' ? require('./images/groups_inactive.png')
												: label == 'Chats' ? require('./images/chats_inactive.png')
													: require('./images/myaccount_inactive.png')

									} />}
						<Text style={[style.bottonTabText, { color: isFocused ? '#003A9A' : '#222' }]}>
							{label}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}


function HomeTabs() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <MyTabBar {...props} />}>
			<Tab.Screen name="Workspace" component={Home} />
			<Tab.Screen name="Groups" component={Chat} />
			<Tab.Screen name="Chats" component={Chat} />
			<Tab.Screen name="My Account" component={Chat} />
		</Tab.Navigator>
	);
}

export default function App() {

	const [loggedIn, setLoggedIn] = useState(false);
	const [userRole, setUserRole] = useState(false);

	useEffect(() => {
		func = async () => {
			const jwt = await AsyncStorage.getItem('@jwt');
			const role = await AsyncStorage.getItem('@role');
			if (jwt !== null) {
				setLoggedIn(true);
				setUserRole(role)
			} else {
				setLoggedIn(false);
				setAppInit(true);
			}
		};
		func();
	}, []);


	function HomeStack({ route, navigation }) {
		const { shouldRedirect, UserRole } = route.params;
		useEffect(() => {
			console.log(UserRole)
			if (shouldRedirect === true) {
				navigation.navigate({ name: 'OnBoarding1', merge: true });
				navigation.dispatch(
					CommonActions.reset({
						index: 1,
						routes: [{ name: 'OnBoarding1' }],
					}),
				)
			} else if (UserRole == 'rescuer') {
				navigation.dispatch(
					CommonActions.reset({
						index: 1,
						routes: [{ name: 'RescueCenter' }],
					}),
				)
			} else if (UserRole == 'client') {
				navigation.dispatch(
					CommonActions.reset({
						index: 1,
						routes: [{ name: 'Home' }],
					}),
				)
			}
		}, [shouldRedirect]);


	}



	return (


		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Home" component={HomeTabs} />
			</Stack.Navigator>
		</NavigationContainer>
	);




}

const style = StyleSheet.create({

	bottonTabText: {
		fontSize: 12,
		fontWeight: '500',
		textAlign: 'center',
		marginTop: 10,
		color: '#003A9A',
	},
	sectionContainer: {
		color: '#000',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		width: '100%',
		height: '100%',
		padding: 24,

		paddingBottom: 215,
	},
	gradientStyle: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
	subTitleStyle: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: '400',
		textAlign: 'left',
		width: '100%',
		textAlign: 'center',
	},
	titleStyle: {
		color: '#FFF',
		fontSize: 36,
		fontWeight: 'bold',
		textAlign: 'left',
		width: '100%',
		textAlign: 'center',
	},
	SignupButtonStyle: {
		width: '90%',
		alignSelf: 'center',
		padding: 10,
		borderRadius: 25,
		backgroundColor: '#1F2067',
		marginTop: 26,
		marginBottom: 40,
		bottom: 65,
		position: 'absolute',
	},

	buttonStyle: {
		width: '90%',
		alignSelf: 'center',
		padding: 10,
		borderRadius: 25,
		backgroundColor: '#191919',
		marginTop: 26,
		marginBottom: 40,
		bottom: 0,
		position: 'absolute',
	},
});
