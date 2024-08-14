import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';
import { getCardColor } from '../Utils/colors';

export default function PokemonCard({ data }) {
  const [details, setDetails] = useState(null);

// Efeito para buscar os detalhes do Pokémon quando a URL muda
  useEffect(() => {
    axios
      .get(data.url)
      .then((response) => setDetails(response.data))
      .catch((error) => console.error(error));
  }, [data.url]);

 // Se os detalhes ainda não foram carregados, exibe "Loading..."
  if (details === null) {
    return <Text>Loading...</Text>;
  }

  // Retorna o card do Pokémon com suas informações
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: getCardColor(details.types[0].type.name) },
      ]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '334px',
    height: '115px',
    top: '26px',
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
    width: '61px',
    height: '25px',
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontWeight: 'bold',
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