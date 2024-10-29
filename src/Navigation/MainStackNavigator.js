import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import AddNoWorkDay from "../Screens/AddNoWorkDay.js";
import AddTrip from "../Screens/AddTrip.js";
import Calendar from "../Screens/Calendar.js";
import Home from "../Screens/Home.js";

const Stack = createStackNavigator();

function MainStackNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Inicio"
				screenOptions={{
					gestureEnabled: true,
				}}
			>
				<Stack.Screen
					name="Inicio"
					component={Home}
					// options={{
					//     title: 'Inicio',
					//     headerStyle: {
					//         backgroundColor: '#2F496E'
					//     },
					//     headerTintColor: '#fff',
					//     headerTitleStyle: {
					//         fontWeight: 'bold'
					//     },
					//     headerTitleAlign:"center"
					// }}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Calendar"
					component={Calendar}
					options={{
						title: "Calendario",
						headerStyle: {
							backgroundColor: "#2F496E",
						},
						headerTintColor: "#fff",
						headerTitleStyle: {
							fontWeight: "bold",
						},
						headerTitleAlign: "center",
					}}
				/>
				<Stack.Screen
					name="AddTrip"
					component={AddTrip}
					options={{
						title: "Añadir Viaje",
						headerStyle: {
							backgroundColor: "#2F496E",
						},
						headerTintColor: "#fff",
						headerTitleStyle: {
							fontWeight: "bold",
						},
						headerTitleAlign: "center",
					}}
				/>
				<Stack.Screen
					name="AddNoWorkDay"
					component={AddNoWorkDay}
					options={{
						title: "Añadir Día Festivo",
						headerStyle: {
							backgroundColor: "#2F496E",
						},
						headerTintColor: "#fff",
						headerTitleStyle: {
							fontWeight: "bold",
						},
						headerTitleAlign: "center",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default MainStackNavigator;
