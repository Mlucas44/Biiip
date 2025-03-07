import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import FondAccueil from "../assets/fond-accueil.svg";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Historique: undefined;
  RetraitSolde: undefined;
  Accueil: undefined;
};

const AccueilBanner: React.FC<{ transactions?: { amount: number }[] }> = ({ transactions = [] }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { height } = Dimensions.get("window");
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(59.65); // valeur par défaut

  useEffect(() => {
    // Charger userName
    const loadUserName = async () => {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      }
    };

    // Charger role
    const loadRole = async () => {
      const storedRole = await AsyncStorage.getItem('role');
      setRole(storedRole);
    };

    // Charger le solde
    const loadBalance = async () => {
      const storedBalance = await AsyncStorage.getItem('balance');
      if (storedBalance === null) {
        await AsyncStorage.setItem('balance', "59.65");
        setBalance(59.65);
      } else {
        setBalance(parseFloat(storedBalance));
      }
    };

    loadUserName();
    loadRole();
    loadBalance();
  }, []);

  const shouldShowRetirer = role !== "true";

  return (
    <View
      className="relative w-full flex justify-center mt-[-96]"
      style={{ height: height * 0.5 }}
    >
      <View className="absolute inset-0">
        <FondAccueil width="100%" height="100%" />
      </View>

      <View className="relative z-10 flex items-left pl-5 mb-8">
        <Text className="text-white text-2xl font-bold">Bonjour {userName}</Text>
      </View>
      <View className="relative z-10 mt-6 flex items-center">
        <Text className="text-white text-lg mt-2">Mon solde</Text>
        <Text className="text-white text-3xl font-bold mt-1">
          {transactions.reduce((total, item) => total + item.amount, 0).toFixed(2)} €

          {/* {balance.toFixed(2).replace('.', ',')} */}
        </Text>
        {shouldShowRetirer && (
          <TouchableOpacity
            className="mt-4 bg-white px-6 py-2 rounded-lg shadow-md"
            onPress={() => navigation.navigate('RetraitSolde')}
          >
            <Text className="text-[#1F2B53] font-bold">Retirer</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AccueilBanner;
