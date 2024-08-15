import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

// Componente de Input para a pesquisa
const SearchInput = ({ query, onChange, onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={onChange}
        placeholder="Digite o nome do Pokémon"
        placeholderTextColor="#aaa"
      />
      <Button title="Buscar" onPress={onSearch} color="#00796b" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e0f2f1',
  },
  input: {
    height: 40,
    borderColor: '#00796b',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#000',
  },
});

export default SearchInput;
