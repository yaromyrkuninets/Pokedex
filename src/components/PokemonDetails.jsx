import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSelectedPokemon } from '../redux/slices/pokemonSlice';

import '../style/pokemon-details.scss';

const PokemonDetails = () => {
    const dispatch = useDispatch();
    const { selectedPokemon } = useSelector(state => state.pokemon);

    const handleCloseDetails = () => {
        dispatch(clearSelectedPokemon());
    };

    if (!selectedPokemon) {
        return null;
    }

    return (
        <section className="details">
            <div className='details__block'>
                <img className='details__img' src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
                <h2 className='details__name'>{`${selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)} #${selectedPokemon.id.toString().padStart(3, '0')}`}</h2>
                <div className='details__attributes'>
                    <table className='attributes__table'>
                        <tbody>
                            <tr className='details__attribute'>
                                <td className='attribute__name'>Type:</td>
                                <td className='attribute__value'>{selectedPokemon.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(', ')}</td>
                            </tr>
                            <tr className='details__attribute'>
                                <td className='attribute__name'>Attack:</td>
                                <td className='attribute__value'>{selectedPokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</td>
                            </tr>
                            <tr className='details__attribute'>
                                <td className='attribute__name'>Defense:</td>
                                <td className='attribute__value'>{selectedPokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}</td>
                            </tr>
                            <tr className='details__attribute'>
                                <td className='attribute__name'>Hp:</td>
                                <td className='attribute__value'>{selectedPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</td>
                            </tr>
                            <tr className='details__attribute'>
                                <td className='attribute__name'>Sp Attack:</td>
                                <td className='attribute__value'>{selectedPokemon.stats.find(stat => stat.stat.name === 'special-attack').base_stat}</td>
                            </tr>
                            <tr className='details__attribute'>
                                <td className='attribute__name'>Sp Defense:</td>
                                <td className='attribute__value'>{selectedPokemon.stats.find(stat => stat.stat.name === 'special-defense').base_stat}</td>
                            </tr>
                            <tr className='details__attribute'>
                                <td className='attribute__name'>Speed:</td>
                                <td className='attribute__value'>{selectedPokemon.stats.find(stat => stat.stat.name === 'speed').base_stat}</td>
                            </tr>
                            <tr className='details__attribute'>
                                <td className='attribute__name'>Weight:</td>
                                <td className='attribute__value'>{selectedPokemon.weight}</td>
                            </tr>
                            <tr className='details__attribute'>
                                <td className='attribute__name'>Total moves:</td>
                                <td className='attribute__value'>{selectedPokemon.moves.length}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button className='details__btn' onClick={handleCloseDetails}>
                    <div className="red-cross"></div>
                </button>
            </div>
        </section>
    );
};

export default PokemonDetails;