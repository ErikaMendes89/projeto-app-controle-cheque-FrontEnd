import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchCamera, requestCameraPermissionsAsync } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CadastroCheque({ navigation }) {
  const [clientes, setClientes] = useState([
    { label: 'Heliomar Alves', value: 'Heliomar Alves' },
    { label: 'Jose', value: 'Jose' },
    { label: 'Kenya', value: 'Kenya' },
  ]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [open, setOpen] = useState(false);
  const [vencimento, setVencimento] = useState(new Date());
  const [numeroCheque, setNumeroCheque] = useState('');
  const [valorCheque, setValorCheque] = useState('');
  const [fotoCheque, setFotoCheque] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false); // Controla a exibição do DateTimePicker

  const solicitarPermissaoCamera = async () => {
    try {
      const result = await requestCameraPermissionsAsync();
      if (result.granted) {
        tirarFoto();
      } else {
        Alert.alert('Permissão Negada', 'Você precisa permitir o acesso à câmera.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao solicitar permissão.');
    }
  };

  const tirarFoto = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        saveToPhotos: true,
      });

      if (result.didCancel) {
        Alert.alert('Cancelado', 'Nenhuma foto foi tirada.');
      } else if (result.errorCode) {
        Alert.alert('Erro', `Erro ao acessar a câmera: ${result.errorCode}`);
      } else if (result.assets && result.assets[0]) {
        setFotoCheque(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao abrir a câmera.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Cheque</Text>

      {/* Menu Suspenso para Selecionar Cliente */}
      <Text style={styles.label}>Cliente</Text>
      <DropDownPicker
        open={open}
        value={clienteSelecionado}
        items={clientes}
        setOpen={setOpen}
        setValue={setClienteSelecionado}
        setItems={setClientes}
        placeholder="Selecione um cliente"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      {/* Data de Vencimento */}
      <Text style={styles.label}>Vencimento</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          {vencimento.toLocaleDateString('pt-BR')}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={vencimento}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setVencimento(selectedDate);
          }}
        />
      )}

      {/* Número do Cheque */}
      <Text style={styles.label}>Número do Cheque</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite o número do cheque"
        value={numeroCheque}
        onChangeText={setNumeroCheque}
      />

      {/* Valor do Cheque */}
      <Text style={styles.label}>Valor do Cheque</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite o valor do cheque"
        value={valorCheque}
        onChangeText={setValorCheque}
      />

      {/* Foto do Cheque */}
      <Text style={styles.label}>Foto do Cheque</Text>
      <View style={styles.photoContainer}>
        {fotoCheque ? (
          <Image source={{ uri: fotoCheque }} style={styles.chequeImage} />
        ) : (
          <Text style={styles.photoPlaceholder}>Nenhuma foto tirada</Text>
        )}
        <TouchableOpacity style={styles.photoButton} onPress={solicitarPermissaoCamera}>
          <Text style={styles.photoButtonText}>Tirar Foto</Text>
        </TouchableOpacity>
      </View>

      {/* Botão Salvar */}
      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Salvo!')}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0C4DE',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  dropdownContainer: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ccc',
  },
  dateButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chequeImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  photoPlaceholder: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  photoButton: {
    backgroundColor: '#4682B4',
    padding: 10,
    borderRadius: 5,
  },
  photoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



