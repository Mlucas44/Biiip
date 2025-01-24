// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Layout from '../components/Layout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AccueilBanner from '../components/AccueilBanner';
import TransactionHistory from '../components/TransactionHistory';
import BarChart from '../components/BarChart';
import axios from '../axiosConfig';

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

function Dashboard() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // État pour les transactions, le chargement et les erreurs
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Utiliser useEffect pour récupérer les données lors du montage du composant
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/pourboires');
        setTransactions(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des transactions :', err);
        setError('Une erreur est survenue lors du chargement des données.');
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);


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
  const data = [
    { x: "Juil", y: 50 },
    { x: "Août", y: 80 },
    { x: "Sept", y: 60 },
    { x: "Oct", y: 40 },
    { x: "Nov", y: 70 },
    { x: "Déc", y: 90 },
  ];

  return (
    <Layout>
      {/* Ajout d’un ScrollView pour permettre le défilement */}
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
        <AccueilBanner transactions={transactions} />

        <TransactionHistory transactions={transactions} />

        {/* Graphique */}
        <BarChart />

      </ScrollView>
    </Layout>
  )
}

export default Dashboard;
