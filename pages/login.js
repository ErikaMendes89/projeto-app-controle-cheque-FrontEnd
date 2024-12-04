import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';


export default function  Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {

    if (username === 'Admin' && password === '1234') {
        navigation.navigate('Dashboard');
    } else {
      Alert.alert('Usuário ou senha incorretos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Cheque</Text>
      <Text style={styles.welcomeText}>Seja bem-vindo!</Text>
      <Image
        style={styles.image}
        source={require('../assets/cheque-bancario.png')} 
      />
      <TextInput
        style={styles.input}
        placeholder="Administrador"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Acessar sistema" onPress={handleLogin} />
      <Text style={styles.footer}>
        Desenvolvido por Erika Mendes - 2024 1.0
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B0C4DE',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    color: '#333',
  },
});
