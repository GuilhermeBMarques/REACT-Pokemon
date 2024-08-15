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

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5', 
  },
});

export default SearchResults;
