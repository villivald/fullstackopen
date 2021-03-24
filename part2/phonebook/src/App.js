import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteObject = {
      name: newName,
      id: persons.length + 1,
      phone: phone,
    };

    persons.some((p) => p.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : axios
          .post("http://localhost:3001/persons", noteObject)
          .then((response) => {
            setPersons(persons.concat(response.data));
          });

    setNewName("");
    setPhone("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} filter={filter} />
      <h2>Add a new number</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        newName={newName}
        phone={phone}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} />
    </div>
  );
};

export default App;
