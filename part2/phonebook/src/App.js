import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: 0, phone: "0401234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.phone}
        </p>
      ))}
    </div>
  );
};

export default App;
