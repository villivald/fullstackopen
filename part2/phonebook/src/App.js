import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: 0, phone: "0401234567" },
    { name: "Ada Lovelace", id: 1, phone: "39-44-5323523" },
    { name: "Dan Abramov", id: 2, phone: "12-43-234345" },
    { name: "Mary Poppendieck", id: 3, phone: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const [filter, setFilter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteObject = {
      name: newName,
      id: persons.length + 1,
      phone: phone,
    };

    persons.some((p) => p.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons([...persons, noteObject]);

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
