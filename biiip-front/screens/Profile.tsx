// Profile.js
import React from 'react';
import { Text, View } from 'react-native';
import Layout from '../components/Layout';
import LogoutButton from '../components/LogoutButton';

function Profile() {
  return (
    <Layout>
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl text-principale">Mon Profil</Text>
        <View className="bg-white p-4 m-4 rounded-lg shadow mb-6">

          <LogoutButton />
        </View>
      </View>
    </Layout>
  );
}

export default Profile;
