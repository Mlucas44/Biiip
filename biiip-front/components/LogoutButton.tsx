import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LogoutButton() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <TouchableOpacity
      onPress={handleLogout}
      className="py-2 px-4 mt-3 rounded"
    >
      <Text className="text-white text-center">Se déconnecter</Text>
    </TouchableOpacity>
  );
}

export default LogoutButton;
