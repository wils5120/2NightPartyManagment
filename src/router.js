import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import CreateBarForm from './CreateBarForm';
import AddBar from './AddBar';
import Home from './Home';
import ListMenu from './ListMenu';
import LoadImage from './LoadImage';
import OneImage from './LoadOneImage';
import CreateUser from './createUser'
import AuthLoading from './AuthLoading'

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AuthLoading" component={AuthLoading} initialRouteName="AuthLoading" options={{
                headerShown: false
            }} />
            <Stack.Screen name="Login" component={Login} options={{
                headerShown: false
            }} />
            <Stack.Screen name="CreateUser" component={CreateUser} options={{
                title: 'Registro',
                headerTitleStyle: { color: '#00095E', textTransform: 'uppercase', fontWeight: 'bold', fontSize: 25 }
            }} />
            <Stack.Screen name="CreateBarForm" component={CreateBarForm} options={{
                title: 'Registro',
                headerTitleStyle: { color: '#00095E', textTransform: 'uppercase', fontWeight: 'bold', fontSize: 25 }
            }}
            />
            <Stack.Screen name="AddBar" component={AddBar} options={{
                headerShown: false
            }} />

            <Stack.Screen name="Home" component={Home} options={{
                headerShown: false
            }}
            />
            <Stack.Screen name="ListMenu" component={ListMenu} options={{
                headerShown: false
            }}
            />

            <Stack.Screen name="LoadImage" component={LoadImage} options={{
                headerShown: false
            }}
            />
            <Stack.Screen name="OneImage" component={OneImage} options={{
                headerShown: false
            }}
            />
        </Stack.Navigator>
    );
}