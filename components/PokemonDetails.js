
import React from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';
import { getCardColor } from '../utils/colors';

const PokemonDetails = ({ pokemon, onBack }) => {
  // Convertendo de decímetros para metros e de hectogramas para quilogramas
  const height = pokemon.height / 10;
  const weight = pokemon.weight / 10;

  return (
    <ScrollView style={[styles.container, { backgroundColor: getCardColor(pokemon.types[0].type.name) }]}>
      <View style={styles.detailsContainer}>
        {/* ID e Nome do Pokémon */}
        <Text style={styles.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</Text>
        <Text style={styles.pokemonNome}>{pokemon.name}</Text>

        {/* Imagem do Pokémon */}
        <Image source={{ uri: pokemon.sprites.front_default }} style={styles.pokemonImagem} />

        {/* Tipos do Pokémon */}
        <View style={styles.typesContainer}>
          {pokemon.types.map((typeInfo, index) => (
            <View key={index} style={styles.pokemonTipo}>
              <Text style={styles.pokemonTexto}>{typeInfo.type.name}</Text>
            </View>
          ))}
        </View>

        {/* Informações básicas do Pokémon */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Altura: {height} m</Text>
          <Text style={styles.infoText}>Peso: {weight} kg</Text>
        </View>

        {/* Habilidades do Pokémon */}
        <View style={styles.abilitiesContainer}>
          <Text style={styles.abilitiesTitle}>Habilidades:</Text>
          {pokemon.abilities.map((abilityInfo, index) => (
            <Text key={index} style={styles.abilityText}>
              {abilityInfo.ability.name}
            </Text>
          ))}
        </View>

        {/* Evoluções do Pokémon */}
        <View style={styles.evolutionsContainer}>
          <Text style={styles.evolutionsTitle}>Evoluções:</Text>
          {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
            <View style={styles.evolutionList}>
              {pokemon.evolutions.map((evolution, index) => (
                <View key={index} style={styles.evolutionItem}>
                  <View style={styles.evolutionImageContainer}>
                    <Image source={{ uri: evolution.image }} style={styles.evolutionImage} />
                  </View>
                  <Text style={styles.evolutionText}>{evolution.name}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.evolutionText}>Nenhuma evolução disponível</Text>
          )}
        </View>

        {/* Botão Voltar */}
        <View style={styles.buttonContainer}>
          <Button title="Voltar" onPress={onBack} color="#00796b" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  detailsContainer: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  pokemonId: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pokemonNome: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  pokemonImagem: {
    width: 200,
    height: 200,
    marginBottom: 10, 
  },
  typesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  pokemonTipo: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  pokemonTexto: {
    fontSize: 16,
    color: '#FFF',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    color: '#FFF',
  },
  abilitiesContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  abilitiesTitle: {
    fontSize: 20,
    color: '#FFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  abilityText: {
    fontSize: 16,
    color: '#FFF',
  },
  evolutionsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  evolutionsTitle: {
    fontSize: 20,
    color: '#FFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  evolutionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  evolutionItem: {
    alignItems: 'center',
    margin: 10,
  },
  evolutionImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    overflow: 'hidden',
  },
  evolutionImage: {
    width: 80,
    height: 80,
  },
  evolutionText: {
    fontSize: 16,
    color: '#FFF',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%', 
    alignItems: 'center',
  },
});

export default PokemonDetails;
