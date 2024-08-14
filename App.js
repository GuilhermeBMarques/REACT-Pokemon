import axios from "axios";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import PokemonCard from './components/PokemonCard';

export default function App() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = () => {
    axios.get(nextUrl)
      .then(response => {
        setList(prevList => [...prevList, ...response.data.results]);
        setNextUrl(response.data.next);
      })
      .catch(error => console.error(error)); 
  };

  const renderItem = ({ item }) => <PokemonCard data={item} />;

  const filteredList = list.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Pokédex</Text>
      <Text style={styles.subtexto}>Procure Pokémon pelo nome ou usando o número Pokédex Nacional.</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Que Pokémon você está procurando?"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredList}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        onEndReached={fetchPokemon}
        onEndReachedThreshold={0.5}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  texto: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '17171B',
  },
  subtexto: {
    fontSize: 16,
    color: '#747476',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#F2F2F2',
    color: '#747476',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '95%',
  },
});
