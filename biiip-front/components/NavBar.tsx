import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
type RootStackParamList = {
  Dashboard: undefined;
  Accounts: undefined;
  Profile: undefined;
};
function NavBar() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-brand-darkBlue-700 p-2 flex-row justify-around">
      <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard')}
        className="flex flex-col items-center"
      >
        <Icon name="home" size={24} color="#FFFFFF" />
        <Text className="text-sm text-white">Accueil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Accounts')}
        className="flex flex-col items-center"
      >
        <Icon name="account-balance-wallet" size={24} color="#FFFFFF" />
        <Text className="text-sm text-white">Comptes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        className="flex flex-col items-center"
      >
        <Icon name="person" size={24} color="#FFFFFF" />
        <Text className="text-sm text-white">Mon profil</Text>
      </TouchableOpacity>
    </View>
  );
}

export default NavBar;
