import React from "react";

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input onChange={props.handleNameChange} value={props.newName} />
      </div>
      <div>
        number: <input onChange={props.handlePhoneChange} value={props.phone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
