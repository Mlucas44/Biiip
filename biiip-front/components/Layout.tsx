// components/Layout.js
import React from 'react';
import { SafeAreaView, } from 'react-native-safe-area-context';
import { View } from 'react-native';
import NavBar from './NavBar';

function Layout({ children }) {
  return (
    <SafeAreaView className="flex-1 bg-fond ">
      <View className="flex-1 ">
        {children}
      </View>
      <NavBar />
    </SafeAreaView>
  );
}

export default Layout;
