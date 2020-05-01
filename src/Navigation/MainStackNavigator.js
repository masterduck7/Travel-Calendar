import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Screens/Home.js'
import Calendar from '../Screens/Calendar.js'
import AddTrip from '../Screens/AddTrip.js'

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' 
        screenOptions={{
          gestureEnabled: true
        }}>
            <Stack.Screen name='Home' component={Home}
            options={{
                title: 'Inicio',
                headerStyle: {
                    backgroundColor: '#2F496E'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                headerTitleAlign:"center"
            }}/>
            <Stack.Screen name='Calendar' component={Calendar}
            options={{
                title: 'Calendario',
                headerStyle: {
                    backgroundColor: '#2F496E'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                headerTitleAlign:"center"
            }}/>
            <Stack.Screen name='AddTrip' component={AddTrip}
            options={{
                title: 'Añadir Viaje',
                headerStyle: {
                    backgroundColor: '#2F496E'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                headerTitleAlign:"center"
            }}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator;