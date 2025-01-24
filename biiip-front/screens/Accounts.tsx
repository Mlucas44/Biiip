import React, { useState, useEffect } from 'react';
import {
  Text,
  ActivityIndicator,
  ScrollView, // Import du composant ScrollView
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Layout from '../components/Layout';
import axios from '../axiosConfig';
import AccountsTransaction from '../components/AccountsTransaction';
import FormRetrait from '../components/FormRetrait';

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
      {/* Contenu scrollable */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header personnalisé */}
        <Text className="text-3xl font-bold text-gray-900 mt-8 ml-6">Compte</Text>

        {/* Transactions */}
        <AccountsTransaction transactions={transactions} />

        {/* Formulaire de retrait */}
        <FormRetrait />
      </ScrollView>
    </Layout>
  );
}

export default Historique;
