import React, { useState } from "react";

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
      <div>
        filter: <input onChange={handleFilter} value={filter} />
      </div>
      <h2>Add a new number</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handlePhoneChange} value={phone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filter
        ? persons
            .filter((person) => person.name.includes(filter))
            .map((person) => (
              <p key={person.id}>
                {person.name} {person.phone}
              </p>
            ))
        : persons.map((person) => (
            <p key={person.id}>
              {person.name} {person.phone}
            </p>
          ))}
    </div>
  );
};

export default App;
