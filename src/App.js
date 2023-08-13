// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import Title from './components/Title';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Title/>
                <div className="main">
                    <PokemonList />
                    <PokemonDetails />
                </div>
            </div>
        </Provider>
    );
}

export default App;
