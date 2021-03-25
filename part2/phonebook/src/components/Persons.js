import React from "react";

const Persons = (props) => {
  return (
    <div>
      {props.filter
        ? props.persons
            .filter((person) => person.name.includes(props.filter))
            .map((person) => (
              <p key={person.id}>
                {person.name} {person.phone}
              </p>
            ))
        : props.persons.map((person) => (
            <p key={person.id}>
              {person.name} {person.phone}{" "}
              <button
                onClick={() => props.deletePerson(person.id, person.name)}
              >
                Delete
              </button>
            </p>
          ))}
    </div>
  );
};

export default Persons;
