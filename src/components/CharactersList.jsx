import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharactersList, deleteCharacter } from "../redux/charactersSlice";
import SearchCharacter from "./SearchCharacter";
import AddCharacter from "./AddCharacter";

function CharactersList() {
  const dispatch = useDispatch();
  const { charactersList } = useSelector((state) => state.charactersList);
  const [enteredCharacter, setEnteredCharacter] = useState("");

  useEffect(() => {
    dispatch(getCharactersList());
  }, []);

  const removeCharacter = (name) => {
    dispatch(deleteCharacter({ name: name }));
  };

  return (
    <div className="flex gap-4 flex-col items-center">
      {charactersList.length === 0 ? (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="w-1/2 flex flex-col items-center gap-4">
          <AddCharacter />
          <SearchCharacter
            enteredCharacter={enteredCharacter}
            setEnteredCharacter={setEnteredCharacter}
          />
          {charactersList
            .filter((item) => {
              return enteredCharacter.toLowerCase() === ""
                ? item
                : item.name
                    .toLowerCase()
                    .includes(enteredCharacter.toLowerCase());
            })
            .map((item) => (
              <div key={item.name} className="bg-white w-full p-4 rounded">
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <h1 className="text-black text-3xl rounded">{item.name}</h1>
                    <h2 className="text-black">Gender: {item.gender}</h2>
                    <h3 className="text-black">
                      Hair color: {item.hair_color}
                    </h3>
                  </div>
                  <button
                    onClick={() => removeCharacter(item.name)}
                    className="text-white bg-red-500 h-10 w-[120px] rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default CharactersList;
