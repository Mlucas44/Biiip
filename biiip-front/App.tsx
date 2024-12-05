// App.js
import React, { useEffect, useState } from 'react';
import "./global.css"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Accounts from './screens/Accounts';
import Profile from './screens/Profile';
import Historique from './screens/Historique'; // Import de Historique

const Stack = createNativeStackNavigator();

function App() {
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setInitialRoute('Dashboard');
      }
    };
    checkToken();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Accounts"
            component={Accounts}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Historique"
            component={Historique}
            options={{ headerShown: false }}
          />
          {/* Ajoutez d'autres écrans ici si nécessaire */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
