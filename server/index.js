const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

let pokemonUsers = [];


let idCounter = 1;

app.use(cors({
  origin: '*',
  methods: '*',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

app.get('/api/pokemon-users', (req, res) => {
  console.log('hello all')
  res.json(pokemonUsers);
});

app.post('/api/pokemon-users', (req, res) => {
  let val = 1
  if (req.body.numberOfPokemon) {
    val = req.body.numberOfPokemon
  }
  const newPokemonUser = {
    id: idCounter++,
    ...req.body,
    numberOfPokemon: val
  };
  pokemonUsers.push(newPokemonUser);
  res.status(201).json(newPokemonUser);
});

// app.get('/pokemon', async (req, res) => {
//   try {
//     const response = await fetch('https://pokeapi.co/api/v2/pokemon');
//     const data = await response.json();
//     console.log(data); // Logs the JSON data to the console
//     return res.status(200).json(data); // Sends the JSON data as the response
//   } catch (error) {
//     console.error('Error fetching data from PokeAPI:', error);
//     return res.status(500).json({ error: 'Failed to fetch data from PokeAPI' });
//   }
// });

app.get('/pokemon/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${username}`);
    const data = await response.json();
    console.log(data); // Logs the JSON data to the console
    return res.status(200).json(data); // Sends the JSON data as the response
  } catch (error) {
    console.error('Error fetching data from PokeAPI:', error);
    return res.status(500).json({ error: 'Failed to fetch data from PokeAPI' });
  }
});


app.get('/pokemon', async (req, res) => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    // console.log(data?.count);
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${data?.count}`;
    const response2 = await fetch(url);
    const data2 = await response2.json();
    return res.status(200).json(data2); 
  } catch (error) {
    console.error('Error fetching data from PokeAPI:', error);
    return res.status(500).json({ error: 'Failed to fetch data from PokeAPI' });
  }
});



app.post('/api/pokemon-sub-user', (req, res) => {
  const newPokemonUser = {
    id: idCounter++,
    ...req.body,
  };
  pokemonUsers.push(newPokemonUser);
  res.status(201).json(newPokemonUser);
});

app.put('/api/pokemon-users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = pokemonUsers.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    pokemonUsers[userIndex] = { ...pokemonUsers[userIndex], ...req.body };
    res.status(200).json(pokemonUsers[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.delete('/api/pokemon-users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  pokemonUsers = pokemonUsers.filter(user => user.id !== userId);
  res.status(204).send();
});

app.delete('/api/pokemon-users', (req, res) => {
  pokemonUsers = [];
  res.status(204).send();
});

app.get('/',(req,res)=>{
    res.status(200).send("OKKk");

})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


