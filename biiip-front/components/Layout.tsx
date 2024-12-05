// components/Layout.js
import React from 'react';
import { SafeAreaView, } from 'react-native-safe-area-context';
import { View } from 'react-native';

import NavBar from './NavBar';
import LogoutButton from './LogoutButton';

function Layout({ children }) {
  return (
    <SafeAreaView className="flex-1 bg-fond">
      <View className="flex-1 p-4">
        {children}
      </View>
      {/* Bouton de déconnexion */}
      {/* <LogoutButton /> */}
      {/* NavBar */}
      <NavBar />
    </SafeAreaView>
  );
}

export default Layout;
