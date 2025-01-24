// components/Historique.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Layout from '../components/Layout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from '../axiosConfig';
import History from '../components/History';

type RootStackParamList = {
  Historique: undefined;
};

type Transaction = {
  id: number;
  amount: number;
  review: string;
  rating: number;
  createdAt: string;
};

function Historique() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // État pour stocker les pourboires
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // État pour le filtre
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Récupérer les pourboires depuis l'API lors du montage du composant
  useEffect(() => {
    const fetchPourboires = async () => {
      try {
        const response = await axios.get('/pourboires');
        setTransactions(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des pourboires :', err);
        setError('Une erreur est survenue lors du chargement des pourboires.');
        setIsLoading(false);
      }
    };

    fetchPourboires();
  }, []);

  // Fonction pour filtrer les transactions
  const filteredTransactions = transactions.filter((item) => {
    let ratingMatch = true;
    let startDateMatch = true;
    let endDateMatch = true;

    if (selectedRating !== null) {
      ratingMatch = item.rating === selectedRating;
    }

    if (startDate) {
      startDateMatch = new Date(item.createdAt) >= startDate;
    }

    if (endDate) {
      endDateMatch = new Date(item.createdAt) <= endDate;
    }

    return ratingMatch && startDateMatch && endDateMatch;
  });

  // -----------------------------
  // AJOUT ICI : deux sous-tableaux
  // -----------------------------
  const now = new Date();

  // 7 derniers jours
  const last7Days = new Date(now);
  last7Days.setDate(last7Days.getDate() - 7);
  const transactions7Days = filteredTransactions.filter((item) => {
    const dateItem = new Date(item.createdAt);
    return dateItem >= last7Days && dateItem <= now;
  });

  // Mois en cours (du 1er au jour actuel)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const transactionsMonth = filteredTransactions.filter((item) => {
    const dateItem = new Date(item.createdAt);
    return dateItem >= startOfMonth && dateItem <= now;
  });

  if (isLoading) {
    return (
      <Layout>
        <ActivityIndicator size="large" color="#0000ff" />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Text className="text-red-500 text-center">{error}</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header personnalisé */}
      <View className="flex-row justify-between items-center mb-4 mt-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            className="ml-2"
            name={'arrow-back'}
            size={28}
          />
        </TouchableOpacity>
      </View>
      <Text className="text-2xl font-bold text-gray-900 ml-6">Historique</Text>

      <History title={"Depuis 7 jours"} transactions={transactions7Days} />

      <History title={"Depuis 1 mois"} transactions={transactionsMonth} />

    </Layout>
  );
}

export default Historique;
