
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { getCardColor } from '../utils/colors';

const SearchResultItem = ({ item, onSelect }) => {
  const [details, setDetails] = useState(null);

  // Busca os detalhes do Pokémon ao carregar o componente
  useEffect(() => {
    axios.get(item.url)
      .then(response => setDetails(response.data))
      .catch(error => console.error(error));
  }, [item.url]);

  // Retorna "Loading..." até que os detalhes sejam carregados
  if (!details) {
    return <Text>Loading...</Text>;
  }

  return (
    <TouchableOpacity onPress={() => onSelect(details)} style={[styles.card, { backgroundColor: getCardColor(details.types[0].type.name) }]}>
      <View>
        <Text style={styles.pokemonId}>
          #{details.id.toString().padStart(3, '0')}
        </Text>
        <Text style={styles.pokemonNome}>{details.name}</Text>
        <View style={styles.typesContainer}>
          {details.types.map((typeInfo) => (
            <View key={typeInfo.type.name} style={styles.pokemonTipo}>
              <Text style={styles.pokemonTexto}>{typeInfo.type.name}</Text>
            </View>
          ))}
        </View>
      </View>
      <Image
        source={{ uri: details.sprites.front_default }}
        style={styles.pokemonImagem}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 115,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 15,
  },
  pokemonId: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#17171B99',
  },
  pokemonNome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  typesContainer: {
    flexDirection: 'row',
    marginTop: 5,
    fontWeight: 'bold',
  },
  pokemonTipo: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginRight: 5,
  },
  pokemonTexto: {
    fontSize: 12,
    color: '#FFF',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  pokemonImagem: {
    width: 130,
    height: 130,
  },
});

export default SearchResultItem;
