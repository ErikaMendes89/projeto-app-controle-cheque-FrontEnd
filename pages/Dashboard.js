import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function Dashboard({navigation}) {
  const handleButtonPress = (buttonName) => {
    Alert.alert(`Botão ${buttonName} pressionado!`);
  };

  return (
    <View style={styles.container}>
      {/* Barra Superior */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Olá Administrador, seja bem-vindo(a)!
        </Text>
      </View>

      {/* Botões de navegação */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Clientes')}
        >
          <Text style={styles.buttonText}>Clientes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CalculoJuros')}
        >
          <Text style={styles.buttonText}>Cálculo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ListaCheques')}
        >
          <Text style={styles.buttonText}>Cheques</Text>
        </TouchableOpacity>
      </View>

      {/* Painéis de resumo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Valor Total</Text>
        <Text style={styles.cardValue}>R$ 6.914,00</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Vencendo Hoje</Text>
        <Text style={styles.cardValue}>R$ 899,00</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Vencendo no Mês Atual</Text>
        <Text style={styles.cardValue}>R$ 5.914,00</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#B0C4DE',
    padding: 20,
  },
  header: {
    padding: 10,
    backgroundColor: '#4682B4',
    borderRadius: 5,
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#F4F9F4',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
});
