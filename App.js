// Joao Pedro da Cunha Machado e Yago Roberto Gomes Moraes
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RealizarLogin from './src/screens/realizarLogin.js';
import PaginaPrincipal from './src/screens/paginaPrincipal.js';
import Elenco from './src/screens/Elenco.js';
import Lampada from './src/screens/Lampada.js';
import Imc from './src/screens/Imc.js';
import SobreNos from './src/screens/SobreNos.js';
import EditarPerfil from './src/screens/EditarPerfil.js';
import Cadastro from './src/screens/Cadastro.js';
import ListarImagens from './src/screens/ListarImagens.js';
import UploadImagens from './src/screens/UploadImagens.js';
import ListarVideo from './src/screens/ListarVideo.js';
import UploadVideos from './src/screens/UploadVideos.js';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,     // Exibir alerta
    shouldPlaySound: true,     // Tocar som
    shouldSetBadge: true,     // Sem badge no ícone
  }),
});

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#1E3A8A' },
          headerTintColor: '#FFF',
          headerTitleStyle: { fontSize: 23, fontWeight: 'bold', marginLeft: 10, }
        }}
      >
        <Stack.Screen name="Login" component={RealizarLogin} options={{ headerShown: false }} />
        <Stack.Screen name="Início" component={PaginaPrincipal} options={{ headerLeft: () => null }} />
        <Stack.Screen name="Elenco" component={Elenco} />
        <Stack.Screen name="Lampada" component={Lampada} />
        <Stack.Screen name="Imc" component={Imc} />
        <Stack.Screen name="Sobre" component={SobreNos} />
        <Stack.Screen name="Perfil" component={EditarPerfil} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="ListarImagens" component={ListarImagens} />
        <Stack.Screen name="UploadImagens" component={UploadImagens} />
        <Stack.Screen name="ListarVideo" component={ListarVideo} />
        <Stack.Screen name="UploadVideos" component={UploadVideos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
