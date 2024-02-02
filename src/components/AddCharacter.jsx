import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addCharacter } from "../redux/charactersSlice";

function AddCharacter() {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [characterAdded, setCharacterAdded] = useState(false);
  const [form, setForm] = useState({
    name: "",
    gender: "",
    hair_color: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addCharacter(data));
    setForm({
      name: "",
      gender: "",
      hair_color: "",
    });
    setCharacterAdded(true);
    setTimeout(() => {
      setCharacterAdded(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col w-full items-start gap-2">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="text-white bg-blue-700 h-10 w-[150px] rounded p-x-3"
      >
        Add character +
      </button>
      {isVisible && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 bg-white p-4 rounded"
        >
          <input
            {...register("name", { required: true })}
            placeholder="Name"
            className="p-1 bg-gray-100"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            {...register("gender", { required: true })}
            placeholder="Gender"
            className="p-1 bg-gray-100"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          />
          <input
            {...register("hair_color", { required: true })}
            placeholder="Hair color"
            className="p-1 bg-gray-100"
            value={form.hair_color}
            onChange={(e) => setForm({ ...form, hair_color: e.target.value })}
          />
          <input
            type="submit"
            className="text-white bg-green-400 h-10 w-[150px] rounded p-x-3"
          />
          {characterAdded && <p className="text-left">Character added!</p>}
        </form>
      )}
    </div>
  );
}

export default AddCharacter;
