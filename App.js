import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import CalculoJuros from './pages/Calculo';
import CadastroCheque from './pages/CadastroCheque';
import ListaCheques from './pages/Cheques';
import cadastroCliente from './pages/cadastroCliente';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Clientes" component={Clientes} />
        <Stack.Screen name="CadastroCliente" component={cadastroCliente} />
        <Stack.Screen name="CalculoJuros" component={CalculoJuros} />
        <Stack.Screen name="CadastroCheque" component={CadastroCheque} />
        <Stack.Screen name="ListaCheques" component={ListaCheques} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

