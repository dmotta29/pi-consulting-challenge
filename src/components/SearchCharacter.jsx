import React from "react";

function SearchCharacter({ enteredCharacter, setEnteredCharacter }) {
  return (
    <div className="flex w-full justify-star">
      <input
        className="w-full p-2 rounded"
        type="text"
        placeholder="Search character"
        value={enteredCharacter}
        onChange={(e) => setEnteredCharacter(e.target.value)}
      />
    </div>
  );
}

export default SearchCharacter;
