import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleRemove = (id, name) => {
    window.confirm(`Delete ${name}?`) &&
      phonebookService.remove(id).then(() => {
        const newPersons = persons.filter((item) => item.id !== id);
        setPersons(newPersons);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteObject = {
      name: newName,
      phone: phone,
    };

    const personToChange = persons.some((p) => p.name === newName);

    if (personToChange) {
      const oldPerson = persons.find((p) => p.name === newName);
      const newPerson = { ...oldPerson, phone: phone };

      window.confirm(
        `${newName} ia already added to phonebook, replace the old number with a new one?`
      ) &&
        phonebookService
          .update(oldPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== oldPerson.id ? person : returnedPerson
              )
            );
          });
    } else {
      phonebookService.create(noteObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
    }

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
      <Persons filter={filter} persons={persons} deletePerson={handleRemove} />
    </div>
  );
};

export default App;
