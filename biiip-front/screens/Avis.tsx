import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Layout from '../components/Layout';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RootStackParamList = {
  Historique: undefined;
};

function Avis() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // État pour gérer le chargement et les erreurs (actuellement non utilisé)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Exemple de liste d'avis dynamiques
  const reviews = [
    { id: 1, rating: 5, text: "Super expérience, service impeccable et ambiance conviviale !" },
    { id: 2, rating: 4, text: "Bon service, mais la nourriture pourrait être améliorée." },
    { id: 3, rating: 5, text: "Expérience fantastique, je recommande vivement !" },
    { id: 4, rating: 3, text: "Moyen, pas à la hauteur de mes attentes." },
    { id: 5, rating: 4, text: "Très bon rapport qualité-prix, ambiance agréable." },
  ];
  const reviewsOctobre = [
    { id: 1, rating: 2, text: "Décor un peu démodé pas a mon gout" },
    { id: 2, rating: 4, text: "Personnel aimable et attentif" },
    { id: 3, rating: 3, text: "Expérience fantastique, je recommande vivement !" },
    { id: 4, rating: 5, text: "Moyen, pas à la hauteur de mes attentes." },
    { id: 5, rating: 3, text: "Temps d'attente un peu long" },
  ];

  if (error) {
    return (
      <Layout>
        <Text className="text-red-500 text-center">{error}</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView>
        {/* Header personnalisé */}
        <View className="flex-row justify-between items-center mb-4 mt-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon className="ml-2" name="arrow-back" size={28} />
          </TouchableOpacity>
        </View>
        <Text className="text-2xl font-bold text-gray-900 ml-6">Mes avis</Text>

        {/* Bloc principal avec note globale */}
        <View className="bg-white rounded-xl shadow p-4 ml-5 mr-5 mt-8">
          {/* Note globale en grand et centré */}
          <Text className="text-4xl font-bold mb-3 mt-5 text-center">
            4,7/5
          </Text>

          {/* Étoiles avec fond personnalisé */}
          <View className="mb-4 mt-4">
            <View className="bg-brand-darkBlue-500-main rounded-lg p-4 mx-24">
              <View className="flex-row justify-center items-center">
                <Icon name="star" size={30} color="#FFD700" />
                <Icon name="star" size={30} color="#FFD700" />
                <Icon name="star" size={30} color="#FFD700" />
                <Icon name="star" size={30} color="#FFD700" />
                <Icon name="star" size={30} color="#C0C0C0" />
              </View>
            </View>
            <Text className="text-center mt-2">230 Avis</Text>
          </View>

          {/* Texte d'information centré */}
          <Text className="text-lg font-bold mb-3 text-center mt-4">
            La note moyenne correspond à toutes vos notes reçues sur TripAdvisor et Google Avis.
          </Text>
        </View>

        {/* Bloc des avis de la semaine dernière */}
        <View className="bg-white rounded-xl shadow p-4 ml-5 mr-5 mt-8 mb-4">
          <Text className="text-2xl font-bold mb-5 mt-5">
            La semaine dernière
          </Text>
          {reviews.map((review) => (
            <View key={review.id} className="bg-gray-100 rounded-xl p-3 mb-8">
              <View className="flex-row justify-start items-center mb-2">
                {/* Affichage des étoiles jaunes */}
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Icon key={`yellow-${index}`} name="star" size={25} color="#FFD700" />
                ))}
                {/* Affichage des étoiles grises */}
                {Array.from({ length: 5 - review.rating }).map((_, index) => (
                  <Icon key={`grey-${index}`} name="star" size={25} color="#C0C0C0" />
                ))}
                <Text className="mt-1 pl-2">{review.rating}</Text>
              </View>
              <Text className="text-gray-800">{review.text}</Text>
            </View>
          ))}
        </View>
        <View className="bg-white rounded-xl shadow p-4 ml-5 mr-5 mt-8 mb-64">
          <Text className="text-2xl font-bold mb-5 mt-5">
            Octobre 2024
          </Text>
          {reviewsOctobre.map((review) => (
            <View key={review.id} className="bg-gray-100 rounded-xl p-3 mb-8">
              <View className="flex-row justify-start items-center mb-2">
                {/* Affichage des étoiles jaunes */}
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Icon key={`yellow-${index}`} name="star" size={25} color="#FFD700" />
                ))}
                {/* Affichage des étoiles grises */}
                {Array.from({ length: 5 - review.rating }).map((_, index) => (
                  <Icon key={`grey-${index}`} name="star" size={25} color="#C0C0C0" />
                ))}
                <Text className="mt-1 pl-2">{review.rating}</Text>
              </View>
              <Text className="text-gray-800">{review.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
}

export default Avis;
