import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RealizarLogin from '../screens/realizarLogin.js';
import PaginaPrincipal from '../screens/paginaPrincipal.js';
import SobreNos from '../screens/sobreNos.js';
import EditarPerfil from '../screens/editarPerfil.js';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="RealizarLogin">
      <Stack.Screen name="Realizar Login" component={RealizarLogin} />
      <Stack.Screen name="Pagina Principal" component={PaginaPrincipal} />
      <Stack.Screen name="SobreNos" component={SobreNos} />
      <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
    </Stack.Navigator>
  );
};

export default Routes; // Nome da exportação corrigido para "Routes"
