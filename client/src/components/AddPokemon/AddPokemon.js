import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddPokemon.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { addingPokemon } from "../../utils/pokemonSlice";
import config from "../../utils/constants";

const AddPokemon = () => {
  const [pokemonOwners, setPokemonOwners] = useState("");
  const [direction, setDirection] = useState("");
  const [initialPositionX, setInitialPositionX] = useState("");
  const [initialPositionY, setInitialPositionY] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonAbility, setPokemonAbility] = useState("");
  const [speed, setSpeed] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [abilityList, setAbilityList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pokemonObj = useSelector((state) => state?.pokemon?.pokemonObj);

  useEffect(() => {
    console.log(pokemonObj);
    const fetchPokemonList = async () => {
      try {
        const response1 = await axios.get(config.baseUrl + "/pokemon");
        const results2 = response1.data.results;
        dispatch(addingPokemon(results2));
        setPokemonList(results2);
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
      }
    };

    if (!pokemonObj.length > 0) {
      fetchPokemonList();
    }
    setPokemonList(pokemonObj);
  }, [pokemonObj, dispatch]);

  const fetchPokemonAbilities = async (pokemonName) => {
    try {
      const response = await axios.get(
        config.baseUrl + `/pokemon/${pokemonName}`
      );
      const abilities = response.data.abilities;
      setAbilityList(abilities);

      if (abilities.length === 1) {
        setPokemonAbility(abilities[0].ability.name);
      } else {
        setPokemonAbility("");
      }
    } catch (error) {
      console.error("Error fetching Pokemon abilities:", error);
    }
  };

  const handlePokemonNameChange = (event) => {
    const selectedPokemon = event.target.value;
    setPokemonName(selectedPokemon);
    fetchPokemonAbilities(selectedPokemon);
  };

  const handleAbilityChange = (event) => {
    setPokemonAbility(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const pokemonData = {
      pokemonOwnerName: pokemonOwners,
      direction,
      initialPositionX,
      initialPositionY,
      pokemonName,
      pokemonAbility,
      speed,
    };

    // Define the promise function
    const saveSettings = async (data) => {
      return await axios.post(
        config.baseUrl + "/api/pokemon-users",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    };

    // Use toast.promise to show notifications based on the promise
    toast
      .promise(saveSettings(pokemonData), {
        loading: "Adding Pokemon...",
        success: <b>Pokemon Added successfully</b>,
        error: <b>Could not Added Pokemon.</b>,
      })
      .then(() => {
        // Clear the form fields upon success
        setPokemonOwners("");
        setDirection("");
        setInitialPositionX("");
        setInitialPositionY("");
        setPokemonName("");
        setPokemonAbility("");
        setSpeed("");
      })
      .catch(() => {
      });
  };

  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={true} />
      <h2>Create Pokemon User</h2>
      <form onSubmit={handleSubmit}>
        {/* Existing form elements */}
        <div className="input-row">
          <div className="input-group">
            <label>Pokemon Owner Name:</label>
            <input
              type="text"
              placeholder="Enter owner's name"
              value={pokemonOwners}
              onChange={(e) => setPokemonOwners(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Direction:</label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              required
            >
              <option value="">Select Direction</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="up">Up</option>
              <option value="down">Down</option>
            </select>
          </div>
          <div className="input-group">
            <label>Initial Position X:</label>
            <input
              type="number"
              placeholder="Enter initial position X"
              value={initialPositionX}
              onChange={(e) => setInitialPositionX(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Initial Position Y:</label>
            <input
              type="number"
              placeholder="Enter initial position Y"
              value={initialPositionY}
              onChange={(e) => setInitialPositionY(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>Pokemon Name:</label>
            <select
              value={pokemonName}
              onChange={handlePokemonNameChange}
              required
            >
              <option value="">Select Pokemon</option>
              {pokemonList.map((pokemon) => (
                <option key={pokemon.name} value={pokemon.name}>
                  {pokemon.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Pokemon Ability:</label>
            <select
              value={pokemonAbility}
              onChange={handleAbilityChange}
              required
            >
              <option value="">Select Ability</option>
              {abilityList.length > 0 ? (
                abilityList.map((ability, index) => (
                  <option key={index} value={ability.ability.name}>
                    {ability.ability.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No abilities available
                </option>
              )}
            </select>
          </div>
          <div className="input-group">
            <label>Speed:</label>
            <input
              type="number"
              placeholder="Enter speed"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="button-group">
          <button type="submit">Add</button>
          <button
            type="button"
            className="home-button"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            type="button"
            className="list-button"
            onClick={() => navigate("/list")}
          >
            List
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPokemon;
