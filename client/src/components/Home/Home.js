import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import config from "../../utils/constants";

const HomePage = () => {
  const [pokemonOwners, setPokemonOwners] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemonOwners();
  }, []);

  const fetchPokemonOwners = async () => {
    try {
      const response = await axios.get(
       config.baseUrl +"/api/pokemon-users"
      );
      setPokemonOwners(response.data);
    } catch (error) {
      console.error("Error fetching Pokemon owners:", error);
    }
  };

  const handleOwnerChange = (e) => {
    const ownerName = e.target.value;
    setSelectedOwner(ownerName);
    const owner = pokemonOwners.find(
      (owner) => owner.pokemonOwnerName === ownerName
    );
    if (owner) {
      setSelectedPokemon({
        ...owner,
        position: {
          x: parseInt(owner.initialPositionX),
          y: parseInt(owner.initialPositionY),
        },
        speed: parseInt(owner.speed),
        direction: owner.direction,
      });
      setIsMoving(false); // Reset isMoving state
    }
  };

  const movePokemon = () => {
    setIsMoving(true);
  };

  const stopPokemon = () => {
    setIsMoving(false);
  };

  const fleePokemon = () => {
    setSelectedPokemon(null);
  };

  useEffect(() => {
    if (isMoving && selectedPokemon) {
      const intervalId = setInterval(() => {
        setSelectedPokemon((prevState) => {
          let newX = prevState.position.x;
          let newY = prevState.position.y;

          if (prevState.direction === "right") {
            newX += prevState.speed;
          } else if (prevState.direction === "left") {
            newX -= prevState.speed;
          } else if (prevState.direction === "up") {
            newY -= prevState.speed;
          } else if (prevState.direction === "down") {
            newY += prevState.speed;
          }

          // Wrapping logic
          if (newX > 800) {
            // Container width
            newX = 0;
          } else if (newX < 0) {
            newX = 800;
          }

          if (newY > 400) {
            // Container height
            newY = 0;
          } else if (newY < 0) {
            newY = 400;
          }

          return {
            ...prevState,
            position: { x: newX, y: newY },
          };
        });
      }, 100);
      return () => clearInterval(intervalId);
    }
  }, [isMoving, selectedPokemon]);

  return (
    <div className="home-page-container">
      <div className="content">
        <h1 className="head-home">Home Page</h1>
        <div className="header-container">
          <label htmlFor="pokemonOwner">Select Pokemon Owner:</label>
          <select
            id="pokemonOwner"
            value={selectedOwner}
            onChange={handleOwnerChange}
          >
            <option value="">Select Owner</option>
            {pokemonOwners.map((owner, index) => (
              <option key={owner.id || index} value={owner.pokemonOwnerName}>
                {owner.pokemonOwnerName}
              </option>
            ))}
          </select>
          <button
            onClick={() => navigate("/add-pokemon")}
            className="header-button add-pokemon"
          >
            Add Pokemon
          </button>
          <button
            onClick={() => navigate("/list")}
            className="header-button list-pokemon"
          >
            List of Pokemon
          </button>
        </div>
        {selectedPokemon && (
          <>
            <table className="pokemon-details">
              <thead>
                <tr>
                  <th>Pokemon Name</th>
                  <th>Ability</th>
                  <th>Number of Pokemon</th>
                  <th>Speed</th>
                  <th>Direction</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedPokemon.pokemonName}</td>
                  <td>{selectedPokemon.pokemonAbility}</td>
                  <td>{selectedPokemon.numberOfPokemon}</td>
                  <td>{selectedPokemon.speed}</td>
                  <td>{selectedPokemon.direction}</td>
                </tr>
              </tbody>
            </table>
            <div className="buttons-container">
              <button onClick={movePokemon} className="header-button add-pokemon">
                Pokemon Go
              </button>
              <button
                onClick={stopPokemon}
                className="header-button add-pokemon-stop"
              >
                Pokemon Stop
              </button>
              <button
                onClick={fleePokemon}
                className="header-button add-pokemon-feel"
              >
                Pokemon Flee
              </button>
            </div>
            <div className="pokemon-container">
              {selectedPokemon && (
                <div
                  className="pokemon"
                  style={{
                    left: `${selectedPokemon.position.x}px`,
                    top: `${selectedPokemon.position.y}px`,
                  }}
                >
                  <div className="pokemon-circle">
                    {selectedPokemon.pokemonName}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
