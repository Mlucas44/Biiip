import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView, // Import du composant ScrollView
} from 'react-native';
import Layout from '../components/Layout';
import LogoutButton from '../components/LogoutButton';
import CustomButton from '../components/button/CustomButton';

function Profile() {
  return (
    <Layout>
      {/* Rendre la page scrollable */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text className="text-3xl font-bold text-gray-900 mt-10 ml-6">Mon profil</Text>

        <View className="bg-white rounded-xl shadow p-4 ml-5 mr-5 mt-10 mb-32">
          <Text className="text-lg font-bold mb-4">Mes informations</Text>

          {/* Avatar */}
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Image
              source={require('../assets/avatar.png')} // Remplacez par le chemin de votre image
              style={{
                width: 100, // Taille de l'avatar
                height: 100,
                borderRadius: 50, // Cercle parfait
                marginBottom: 10,
              }}
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>
              Camille MARTIN
            </Text>
          </View>

          {/* Informations */}
          <View className="space-y-6">
            <View className="mb-3">
              <Text className=" mb-1">Nom</Text>
              <TextInput
                value="Martin"
                editable={false}
                className="bg-gray-100 p-3 rounded-md text-gray-600"
              />
            </View>
            <View className="mb-3">
              <Text className=" mb-1">Prénom</Text>
              <TextInput
                value="Camille"
                editable={false}
                className="bg-gray-100 p-3 rounded-md text-gray-600"
              />
            </View>
            <View className="mb-3">
              <Text className=" mb-1">E-mail</Text>
              <TextInput
                value="camille.martin@gmail.com"
                editable={false}
                className="bg-gray-100 p-3 rounded-md text-gray-600"
              />
            </View>
            <View className="mb-3">
              <Text className=" mb-1">Téléphone</Text>
              <TextInput
                value="+33 6 67 53 21 73"
                editable={false}
                className="bg-gray-100 p-3 rounded-md text-gray-600"
              />
            </View>
          </View>

          {/* Boutons */}
          <View className="mt-6">
            <CustomButton
              title="Modifier mon profil"
              variant="primary"
            />
          </View>
          <LogoutButton />
        </View>
      </ScrollView>
    </Layout>
  );
}

export default Profile;
