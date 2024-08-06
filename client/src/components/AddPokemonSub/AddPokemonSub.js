import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddPokemonSub.css";
import config from "../../utils/constants";
import toast, { Toaster } from "react-hot-toast";

const AddPokemonSub = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  console.log("AddPokemonSub", user);
  const [pokemonOwnerName, setPokemonOwnerName] = useState(
    user ? user.pokemonOwnerName : ""
  );
  const [numberOfPokemon, setNumberOfPokemon] = useState(
    user ? user.numberOfPokemon : ""
  );

  const saveSettings = async (data) => {
    return await axios.post(config.baseUrl + "/api/pokemon-users", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleAdd = () => {
    if (!pokemonOwnerName) {
      alert("Owner name is required.");
      navigate("/add-pokemon");
      return;
    }

    const newUser = {
      pokemonOwnerName,
      pokemonName: user?.pokemonName,
      pokemonAbility: user?.pokemonAbility,
      numberOfPokemon,
      direction: user?.direction,
      initialPositionX: user?.initialPositionX,
      initialPositionY: user?.initialPositionY,
      speed: user?.speed,
    };

    // Use toast.promise to show notifications based on the promise
    toast.promise(saveSettings(newUser), {
      loading: "Adding Pokemon...",
      success: <b>Pokemon added successfully!</b>,
      error: <b>Could not add Pokemon.</b>,
    })
    .then(() => {
      // Clear the form fields upon success
      navigate("/list");
    })
    .catch((error) => {
      console.error("Error adding Pokemon user:", error);
    });
  };

  return (
    <div className="add-pokemon-container">
      <Toaster position="top-center" reverseOrder={true} />
      <h1>Add Pokemon</h1>
      <form className="add-pokemon-form">
        <div>
          <label htmlFor="ownerName">Owner Name</label>
          <input
            id="ownerName"
            type="text"
            value={pokemonOwnerName}
            onChange={(e) => setPokemonOwnerName(e.target.value)}
            placeholder="Owner Name"
          />
        </div>
        <div>
          <label htmlFor="pokemonName">Pokemon Name</label>
          <input
            id="pokemonName"
            type="text"
            value={user?.pokemonName}
            readOnly
            placeholder="Pokemon Name"
          />
        </div>
        <div>
          <label htmlFor="ability">Ability</label>
          <input
            id="ability"
            type="text"
            value={user?.pokemonAbility}
            readOnly
            placeholder="Ability"
          />
        </div>
        <div>
          <label htmlFor="numberOfPokemon">Number of Pokemon</label>
          <input
            id="numberOfPokemon"
            type="text"
            value={numberOfPokemon}
            onChange={(e) => setNumberOfPokemon(e.target.value)}
            placeholder="Number of Pokemon"
          />
        </div>
      </form>
      <div className="button-poke">
        <button
          type="button"
          className="add-pokemon-button"
          onClick={handleAdd}
        >
          Add Pokemon
        </button>
      </div>
    </div>
  );
};

export default AddPokemonSub;
