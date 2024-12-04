import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function CalculoJuros() {
  const [dataCheque, setDataCheque] = useState(new Date());
  const [dataVencimento, setDataVencimento] = useState(new Date());
  const [valorCheque, setValorCheque] = useState('');
  const [percentualJuros, setPercentualJuros] = useState('3'); 
  const [valorJuros, setValorJuros] = useState(0);
  const [valorLiquido, setValorLiquido] = useState(0);

  const [showChequePicker, setShowChequePicker] = useState(false);
  const [showVencimentoPicker, setShowVencimentoPicker] = useState(false);

  const calcularJuros = () => {
    if (!valorCheque || isNaN(valorCheque)) {
      Alert.alert('Erro', 'Insira um valor válido para o cheque.');
      return;
    }

    const dias = Math.ceil(
      (dataVencimento.getTime() - dataCheque.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (dias < 0) {
      Alert.alert('Erro', 'A data de vencimento deve ser posterior à data do cheque.');
      return;
    }

    const valor = parseFloat(valorCheque);
    const juros = (valor * parseFloat(percentualJuros) * dias) / 100;
    const liquido = valor - juros;

    setValorJuros(juros.toFixed(2));
    setValorLiquido(liquido.toFixed(2));
  };

  const handleSalvar = () => {
    Alert.alert('Sucesso', 'Cálculo salvo com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cálculo de Juros</Text>

      {/* Data do Cheque */}
      <View style={styles.row}>
        <Text style={styles.label}>Data do Cheque</Text>
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>
            {dataCheque.toLocaleDateString('pt-BR')}
          </Text>
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={() => setShowChequePicker(true)}
          >
            <MaterialIcons name="calendar-today" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        {showChequePicker && (
          <DateTimePicker
            value={dataCheque}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowChequePicker(false);
              if (selectedDate) setDataCheque(selectedDate);
            }}
          />
        )}
      </View>

      {/* Data de Vencimento */}
      <View style={styles.row}>
        <Text style={styles.label}>Vencimento</Text>
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>
            {dataVencimento.toLocaleDateString('pt-BR')}
          </Text>
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={() => setShowVencimentoPicker(true)}
          >
            <MaterialIcons name="calendar-today" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        {showVencimentoPicker && (
          <DateTimePicker
            value={dataVencimento}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowVencimentoPicker(false);
              if (selectedDate) setDataVencimento(selectedDate);
            }}
          />
        )}
      </View>

      {/* Número de Dias */}
      <Text style={styles.label}>Nº de Dias</Text>
      <Text style={styles.result}>
        {Math.ceil(
          (dataVencimento.getTime() - dataCheque.getTime()) / (1000 * 60 * 60 * 24)
        )}
      </Text>

      {/* Valor do Cheque */}
      <Text style={styles.label}>Valor do Cheque</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0,00"
        value={valorCheque}
        onChangeText={setValorCheque}
      />

      {/* Percentual Juros */}
      <Text style={styles.label}>Percentual Juros</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="3"
        value={percentualJuros}
        onChangeText={setPercentualJuros}
      />

      {/* Valor do Juros */}
      <Text style={styles.label}>Valor do Juros</Text>
      <Text style={styles.result}>R$ {valorJuros}</Text>

      {/* Valor Líquido */}
      <Text style={styles.label}>Valor Líquido</Text>
      <Text style={styles.result}>R$ {valorLiquido}</Text>

      {/* Botão Calcular */}
      <TouchableOpacity style={styles.button} onPress={calcularJuros}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {/* Botão Salvar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
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
  row: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  calendarButton: {
    marginLeft: 10,
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
  result: {
    fontSize: 16,
    color: '#000080',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
