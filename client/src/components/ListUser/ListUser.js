import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ListUser.css";
import config from "../../utils/constants";

const ListUser = () => {
  const [pokemonUsers, setPokemonUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemonUsers();
  }, []);

  const fetchPokemonUsers = async () => {
    try {
      const response = await axios.get(config.baseUrl + "/api/pokemon-users");
      setPokemonUsers(response.data);
    } catch (error) {
      console.error("Error fetching Pokemon users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(config.baseUrl + `/api/pokemon-users/${id}`);
      fetchPokemonUsers();
    } catch (error) {
      console.error("Error deleting Pokemon user:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete(config.baseUrl + "/api/pokemon-users");
      fetchPokemonUsers();
    } catch (error) {
      console.error("Error deleting all Pokemon users:", error);
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setEditedUser({ ...user });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        config.baseUrl + `/api/pokemon-users/${editId}`,
        editedUser
      );
      fetchPokemonUsers();
      setEditId(null);
    } catch (error) {
      console.error("Error updating Pokemon user:", error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditedUser({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNewFromRow = (user) => {
    console.log("addNewFromRow", user);
    navigate("/add-pokemon-sub", { state: { user } });
  };

  return (
    <div>
      <h1 className="head-list">List of Pokemon Users</h1>
      <div className="buttons-container">
        <button className="delete-all-button button" onClick={handleDeleteAll}>
          <FaTrashAlt /> <p>Delete All</p>
        </button>
        <button
          className="header-button button header-button add-pokemon"
          onClick={() => navigate("/add-pokemon")}
        >
          Add Pokemon
        </button>
        <button
          className="header-button-list button"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>
      <table className="table-container">
        <thead>
          <tr>
            <th>Owner Name</th>
            <th>Pokemon Name</th>
            <th>Ability</th>
            <th>No. of Pokemon</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {pokemonUsers.map((user) => (
            <tr key={user.id}>
              <td>
                {editId === user.id ? (
                  <input
                    type="text"
                    name="pokemonOwnerName"
                    value={editedUser.pokemonOwnerName || ""}
                    onChange={handleChange}
                  />
                ) : (
                  user.pokemonOwnerName
                )}
              </td>
              <td>
                {editId === user.id ? (
                  <input
                    type="text"
                    name="pokemonName"
                    value={editedUser.pokemonName || ""}
                    onChange={handleChange}
                  />
                ) : (
                  user.pokemonName
                )}
              </td>
              <td>
                {editId === user.id ? (
                  <input
                    type="text"
                    name="pokemonAbility"
                    value={editedUser.pokemonAbility || ""}
                    onChange={handleChange}
                  />
                ) : (
                  user.pokemonAbility
                )}
              </td>
              <td>
                {editId === user.id ? (
                  <input
                    type="text"
                    name="numberOfPokemon"
                    value={editedUser.numberOfPokemon || ""}
                    onChange={handleChange}
                  />
                ) : (
                  user.numberOfPokemon
                )}
              </td>
              <td>
                {editId === user.id ? (
                  <>
                    <button className="save-button button" onClick={handleSave}>
                      Save
                    </button>
                    <button
                      className="cancel-button button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="action-button button"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit />
                  </button>
                )}
              </td>
              <td>
                <button
                  className="action-button button"
                  onClick={() => handleDelete(user.id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
              <td>
                <button
                  className="action-button button"
                  onClick={() => handleAddNewFromRow(user)}
                >
                  <FaPlus />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUser;
