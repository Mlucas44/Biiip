import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

type Tab = 'Accueil' | 'Compte' | 'Profil' | 'Mon-Biiip';

const TabBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Accueil');
  const [role, setRole] = useState<string | null>(null);
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {
    const fetchRole = async () => {
      const storedRole = await AsyncStorage.getItem('role');
      setRole(storedRole);
    };
    fetchRole();
  }, []);
  useEffect(() => {
    setActiveTab(route.name as Tab);
  }, [route]);
  let tabs: Tab[];
  if (role === "true") {
    tabs = ['Accueil', 'Mon-Biiip', 'Profil'];
  } else {
    tabs = ['Accueil', 'Compte', 'Profil'];
  }

  const handleTabPress = (tab: Tab) => {
    navigation.navigate(tab);
  };

  const renderTabIcon = (tab: Tab) => {
    switch (tab) {
      case 'Accueil':
        return <Icon name="home" size={24} color="white" />;
      case 'Compte':
        return <Icon name="account-balance-wallet" size={24} color="white" />;
      case 'Mon-Biiip':
        return <Icon name="credit-card" size={24} color="white" />;
      case 'Profil':
        return <Icon name="person" size={24} color="white" />;
      default:
        return null;
    }
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-brand-darkBlue-500-main flex-row justify-around py-4 rounded-t-3xl">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => handleTabPress(tab)}
          className="flex-1 items-center"
        >
          <View className="flex-1 items-center">
            {/* Surligner l'onglet actif */}
            <View style={{ height: 40, width: 60, alignItems: 'center', justifyContent: 'center' }}>
              {activeTab === tab && (
                <View className="absolute -top-10 items-center justify-center">
                  <View className="absolute bottom-[-10px] w-[80px] h-[46px] bg-neutrals-grey-50 rounded-bl-[60px] rounded-br-[60px]" />
                  <View className="w-16 h-16 bg-brand-darkBlue-500-main rounded-full flex items-center justify-center">
                    {renderTabIcon(tab)}
                  </View>
                </View>
              )}
              {activeTab !== tab && <View>{renderTabIcon(tab)}</View>}
            </View>
            <Text
              className={`mb-4 font-bold ${activeTab === tab ? 'text-neutrals-blackWhite-white' : 'text-brand-darkBlue-100'
                } font-medium`}
            >
              {tab}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabBar;
