import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pokemonList: [],
    selectedPokemon: null,
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setPokemonList: (state, action) => {
            state.pokemonList = action.payload;
        },
        selectPokemon: (state, action) => {
            state.selectedPokemon = action.payload;
        },
        clearSelectedPokemon: (state) => {
            state.selectedPokemon = null;
        },
    },
});

export const { setPokemonList, selectPokemon, clearSelectedPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
