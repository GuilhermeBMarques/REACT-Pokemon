import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import PokemonDetails from './components/PokemonDetails';
import SearchInput from './components/SearchInput';
import SearchResultItem from './components/SearchResultItem';

// Componente principal do aplicativo
const App = () => {
  // Estados do aplicativo
  const [list, setList] = useState([]); // Lista de Pokémon carregados
  const [search, setSearch] = useState(''); // Texto da pesquisa
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20'); // URL para buscar mais Pokémon
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Pokémon selecionado para mostrar detalhes

  // Efeito para buscar Pokémon quando o componente é montado
  useEffect(() => {
    fetchPokemon();
  }, []);

  // Função para buscar Pokémon da URL atual
  const fetchPokemon = () => {
    axios.get(nextUrl)
      .then(response => {
        // Atualiza a lista com os Pokémon da resposta
        setList(prevList => [...prevList, ...response.data.results]);
        // Atualiza a URL para a próxima página de resultados
        setNextUrl(response.data.next);
      })
      .catch(error => console.error(error));
  };

  // Função para buscar um Pokémon específico com base no texto da pesquisa
  const searchPokemon = async () => {
    if (!search.trim()) {
      return; // Não faz nada se a pesquisa estiver vazia
    }
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      // Atualiza a lista para mostrar apenas o Pokémon pesquisado
      setList([response.data]);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  // Função para mostrar detalhes de um Pokémon selecionado
  const showPokemonDetails = async (pokemon) => {
    try {
      // Busca os detalhes do Pokémon
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      const speciesResponse = await axios.get(response.data.species.url);
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
      const evolutionChainResponse = await axios.get(evolutionChainUrl);

      // Obtém as evoluções do Pokémon
      const evolutions = [];
      let currentEvolution = evolutionChainResponse.data.chain;

      // Itera através da cadeia de evolução para obter todas as evoluções
      while (currentEvolution) {
        const evolutionName = currentEvolution.species.name;
        const evolutionData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionName}`);
        evolutions.push({
          name: evolutionName,
          image: evolutionData.data.sprites.front_default,
        });
        currentEvolution = currentEvolution.evolves_to[0];
      }

      // Atualiza o estado com as informações do Pokémon e suas evoluções
      setSelectedPokemon({ ...response.data, evolutions });
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  // Função para voltar à tela de pesquisa
  const goBack = () => {
    setSelectedPokemon(null); // Limpa o Pokémon selecionado
  };

  // Filtra a lista de Pokémon com base na pesquisa
  const filteredList = list.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  // Renderiza cada item da lista de Pokémon
  const renderItem = ({ item }) => (
    <SearchResultItem
      item={item}
      onSelect={showPokemonDetails}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {selectedPokemon ? (
        // Exibe detalhes do Pokémon se um Pokémon estiver selecionado
        <PokemonDetails pokemon={selectedPokemon} onBack={goBack} />
      ) : (
        <View style={styles.searchContainer}>
          <Text style={styles.texto}>Pokédex</Text>
          <Text style={styles.subtexto}>Procure Pokémon pelo nome ou usando o número Pokédex Nacional.</Text>
          <SearchInput query={search} onChange={setSearch} onSearch={searchPokemon} />
          <FlatList
            data={filteredList} // Dados a serem exibidos na lista
            renderItem={renderItem} // Função para renderizar cada item
            keyExtractor={(item) => item.name} // Chave única para cada item
            onEndReached={fetchPokemon} // Função para buscar mais Pokémon ao rolar para baixo
            onEndReachedThreshold={0.5} // Quando começar a buscar mais dados (metade da tela)
          />
        </View>
      )}
    </SafeAreaView>
  );
};

// Estilos para o componente principal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Cor de fundo clara para o aplicativo
  },
  searchContainer: {
    flex: 1,
    alignItems: 'center',
  },
  texto: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtexto: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default App;
