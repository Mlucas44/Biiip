import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
// import FondAccueil from "../assets/fond-accueil.svg"; // Chemin vers ton fichier SVG
import FondAccueil from "../assets/fond-accueil.svg"; // Chemin vers ton fichier SVG
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Historique: undefined;
};

const AccueilBanner: React.FC<{ transactions?: { amount: number }[] }> = ({ transactions = [] }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { height } = Dimensions.get("window"); // Récupère la hauteur de l'écran
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loadUserName = async () => {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      }
    };
    loadUserName();
  }, []);


  return (
    <View
      className="relative w-full flex justify-center mt-[-96]"
      style={{ height: height * 0.5 }} // Prend 40% de la hauteur de l'écran
    >
      {/* SVG en arrière-plan */}
      <View className="absolute inset-0">
        <FondAccueil width="100%" height="100%" />
      </View>

      {/* Contenu au-dessus du SVG */}
      <View className="relative z-10 flex items-left pl-5  mb-8">

        <Text className="text-white text-2xl font-bold">Bonjour {userName}  </Text>
      </View>
      <View className="relative z-10 mt-6 flex items-center ">
        <Text className="text-white text-lg mt-2">Mon solde</Text>
        <Text className="text-white text-3xl font-bold mt-1">
          {transactions.reduce((total, item) => total + item.amount, 0).toFixed(2)} €
        </Text>
        <TouchableOpacity className="mt-4 bg-white px-6 py-2 rounded-lg shadow-md"
          onPress={() => navigation.navigate('RetraitSolde')}
        >
          <Text className="text-[#1F2B53] font-bold">Retirer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccueilBanner;
