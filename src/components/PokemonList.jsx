import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPokemonList, selectPokemon, clearSelectedPokemon } from '../redux/slices/pokemonSlice';
import axios from 'axios';

import '../style/pokemon-list.scss';

const PokemonList = () => {
    const dispatch = useDispatch();
    const { pokemonList } = useSelector(state => state.pokemon);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [loadingNextPage, setLoadingNextPage] = useState(false); // Доданий стан для відстеження завантаження
    const [pokemonDetails, setPokemonDetails] = useState({});
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=12');
                const newPokemonList = response.data.results;
                const newPokemonDetails = { ...pokemonDetails };

                // Запити даних про покемонів
                const detailsPromises = newPokemonList.map(async (pokemon) => {
                    try {
                        const response = await axios.get(pokemon.url);
                        newPokemonDetails[pokemon.url] = response.data;
                    } catch (error) {
                        console.error(`Error fetching details for ${pokemon.name}:`, error);
                        newPokemonDetails[pokemon.url] = null;
                    }
                });

                await Promise.all(detailsPromises);

                dispatch(setPokemonList(newPokemonList));
                setNextPageUrl(response.data.next);
                setPokemonDetails(newPokemonDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPokemonData();
    }, []);

    const handlePokemonClick = (pokemonUrl) => {
        dispatch(selectPokemon(pokemonDetails[pokemonUrl]));
    };

    const handleLoadMore = () => {
        if (!loadingNextPage && nextPageUrl) {
            setLoadingNextPage(true);
            axios.get(nextPageUrl)
                .then(response => {
                    const newPokemonList = [...pokemonList, ...response.data.results];
                    dispatch(setPokemonList(newPokemonList));
                    setNextPageUrl(response.data.next);

                    // Завантаження деталей для нових покемонів
                    const newPokemonDetails = { ...pokemonDetails };
                    const detailsPromises = response.data.results.map(async (pokemon) => {
                        try {
                            const response = await axios.get(pokemon.url);
                            newPokemonDetails[pokemon.url] = response.data;
                        } catch (error) {
                            console.error(`Error fetching details for ${pokemon.name}:`, error);
                            newPokemonDetails[pokemon.url] = null;
                        }
                    });

                    Promise.all(detailsPromises).then(() => {
                        setPokemonDetails(newPokemonDetails);
                        setLoadingNextPage(false);
                    });
                })
                .catch(error => {
                    console.error('Error fetching more pokemons:', error);
                    setLoadingNextPage(false);
                });
        }
    };

    const typeColors = {
        grass: 'green',
        fire: 'red',
        poison: 'purple',
        electric: 'yellow',
        normal: 'gray',
        fighting: 'maroon',
        flying: 'blue',
        ground: 'saddlebrown',
        rock: 'dimgray',
        bug: 'olive',
        ghost: 'indigo',
        steel: 'lightsteelblue',
        water: 'blue',
        psychic: 'pink',
        ice: 'aliceblue',
        dragon: 'darkviolet',
        dark: 'black',
        fairy: 'lightpink'
    };

    const handleTypeFilter = (type) => {
        setSelectedType(type);
    };

    return (
        <section className='list'>
            <div className='list__type-filter'>
                <p className='list__filter'>Filter by type:</p>
                <select value={selectedType} onChange={(e) => handleTypeFilter(e.target.value)}>
                    <option value="">All</option>
                    <option value="grass">Grass</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="bug">Bug</option>
                    <option value="normal">Normal</option>
                    <option value="poison">Poison</option>
                    <option value="electric">Electric</option>
                    <option value="ground">Ground</option>
                    <option value="fairy">Fairy</option>
                    <option value="fighting">Fighting</option>
                    <option value="psychic">Psychic</option>
                    <option value="rock">Rock</option>
                    <option value="ghost">Ghost</option>
                    <option value="ice">Ice</option>
                    <option value="dragon">Dragon</option>
                    <option value="dark">Dark</option>
                    <option value="steel">Steel</option>
                    <option value="flying">Flying</option>
                </select>
            </div>
            <div className="list__wrapper">
                {pokemonList.map(pokemon => {
                    if (!selectedType || pokemonDetails[pokemon.url]?.types.some(type => type.type.name === selectedType)) {
                        return (
                            <div className='list__block' key={pokemon.url} onClick={() => handlePokemonClick(pokemon.url)}>
                                <img className='list__img' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} />
                                <p className='list__name'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                                <div className="list__type-block">
                                    {pokemonDetails[pokemon.url] ? (
                                        <div className='list__types'>
                                            {pokemonDetails[pokemon.url].types.map(type => (
                                                <span key={type.type.name} className={`list__type ${typeColors[type.type.name]}`}>
                                                    {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className='list__type'>Types: Loading...</p>
                                    )}
                                </div>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
            <button className='list__btn' onClick={handleLoadMore} disabled={loadingNextPage}>Load More</button>
        </section>
    );
};

export default PokemonList;