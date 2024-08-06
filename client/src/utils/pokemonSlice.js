import { createSlice } from '@reduxjs/toolkit';

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemonObj: []
  },
  reducers: {
    addingPokemon: (state, action) => {
      state.pokemonObj = action.payload;
    }
  }
});

export const { addingPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
