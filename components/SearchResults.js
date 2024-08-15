import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SearchResultItem from './SearchResultItem';

// Componente para exibir a lista de resultados
const SearchResults = ({ results, onSelect }) => {
  return (
    <FlatList
      data={results}
      renderItem={({ item }) => <SearchResultItem item={item} onSelect={onSelect} />}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.container}
    />
  );
};

// Estilos para o componente
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5', // Cor para a tela de pesquisa
  },
});

export default SearchResults;
