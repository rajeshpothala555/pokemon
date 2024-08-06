import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPokemon from './components/AddPokemon/AddPokemon';
import ListUser from './components/ListUser/ListUser';
import HomePage from './components/Home/Home';
import AddPokemonSub from './components/AddPokemonSub/AddPokemonSub';
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/add-pokemon" element={<AddPokemon />} />
          <Route path="/list" element={<ListUser />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/add-pokemon-sub" element={<AddPokemonSub />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
