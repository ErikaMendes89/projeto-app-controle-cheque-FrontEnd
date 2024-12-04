import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function ListaClientes({navigation}) {
  const [searchText, setSearchText] = useState('');
  const [clientes, setClientes] = useState([
    { id: '1', nome: 'Heliomar Alves', email: 'heliomaralves@msn.com', telefone: '64981170400' },
    { id: '2', nome: 'Jose', email: 'josealves@gmail.com', telefone: '64949494949' },
    { id: '3', nome: 'Kenya', email: 'kenya@gmail.com', telefone: '6498494949' },
  ]);

  // Filtrar clientes com base no texto de busca
  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderCliente = ({ item }) => (
    <View style={styles.clienteContainer}>
      <View>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <Text style={styles.telefone}>{item.telefone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
    {/* Barra Superior */}
    <View style={styles.header}>
      <Text style={styles.headerText}>Lista de Clientes</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CadastroCliente')} 
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>

      {/* Campo de Busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar cliente"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Lista de Clientes */}
      <FlatList
        data={filteredClientes}
        keyExtractor={(item) => item.id}
        renderItem={renderCliente}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>Nenhum cliente encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0C4DE',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4682B4',
    padding: 20,
    borderRadius: 5,
    marginBottom: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  addButtonText: {
    fontSize: 20,
    color: '#B0C4DE',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  clienteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  telefone: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000080',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 16,
  },
});
