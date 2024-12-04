import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function ListaCheques({ navigation }) {
  const [cheques, setCheques] = useState([
    {
      id: '12',
      nome: 'Heliomar Alves',
      valor: '1650.00',
      numeroCheque: '1',
      vencimento: '29/06/2024',
    },
    {
      id: '14',
      nome: 'Heliomar Alves',
      valor: '600.00',
      numeroCheque: '1',
      vencimento: '28/06/2024',
    },
    {
      id: '16',
      nome: 'Heliomar Alves',
      valor: '388.00',
      numeroCheque: '2',
      vencimento: '29/06/2024',
    },
    {
      id: '18',
      nome: 'Heliomar Alves',
      valor: '1000.00',
      numeroCheque: '2',
      vencimento: '23/06/2024',
    },
  ]);


  const excluirCheque = (id) => {
    Alert.alert('Confirmação', 'Deseja realmente excluir este cheque?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          setCheques((prevCheques) => prevCheques.filter((cheque) => cheque.id !== id));
        },
      },
    ]);
  };

  const renderCheque = ({ item }) => (
    <View style={styles.chequeContainer}>
      <View style={styles.chequeInfo}>
        <Text style={styles.text}>
          <Text style={styles.label}>Nome: </Text>
          {item.nome}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Valor: </Text>R$ {item.valor}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Nº Cheque: </Text>
          {item.numeroCheque}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Vencimento: </Text>
          {item.vencimento}
        </Text>
      </View>
      <View style={styles.chequeActions}>
        <Text style={styles.text}>
          <Text style={styles.label}>ID: </Text>
          {item.id}
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => excluirCheque(item.id)}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Cheques</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CadastroCheque')} 
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Cheques */}
      <FlatList
        data={cheques}
        keyExtractor={(item) => item.id}
        renderItem={renderCheque}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>Nenhum cheque cadastrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0C4DE',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addButtonText: {
    fontSize: 24,
    color: '#4682B4',
    fontWeight: 'bold',
  },
  chequeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  chequeInfo: {
    flex: 1,
  },
  chequeActions: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#e57373',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 16,
  },
});
