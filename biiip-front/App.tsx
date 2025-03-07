// App.js
import React, { useEffect, useState } from 'react';
import "./global.css"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './screens/Login';
import Accueil from './screens/Accueil';
import Compte from './screens/Compte';
import Profil from './screens/Profil';
import Historique from './screens/Historique';
import Statistiques from './screens/Statistiques';
import Retrait from './screens/Retrait';
import RetraitSolde from './screens/RetraitSolde';
import Biiip from './screens/Biiip';
import Boitier from './screens/Boitier';

const Stack = createNativeStackNavigator();

function App() {
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setInitialRoute('Accueil');
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
            name="Accueil"
            component={Accueil}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Compte"
            component={Compte}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Biiip"
            component={Biiip}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Boitier"
            component={Boitier}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profil"
            component={Profil}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Historique"
            component={Historique}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Statistiques"
            component={Statistiques}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Retrait"
            component={Retrait}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RetraitSolde"
            component={RetraitSolde}
            options={{ headerShown: false }}
          />
          {/* Ajoutez d'autres écrans ici si nécessaire */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
