// Accounts.js
import React from 'react';
import { Text, View } from 'react-native';
import Layout from '../components/Layout';

function Accounts() {
  return (
    <Layout>
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl text-principale">Mon Accounts</Text>
        {/* Ajoutez le contenu de votre profil ici */}
      </View>
    </Layout>
  );
}

export default Accounts;
