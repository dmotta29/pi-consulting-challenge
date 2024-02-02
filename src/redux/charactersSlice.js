import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCharactersList = createAsyncThunk(
  "charactersList/getCharacters",
  async () => {
    const response = await fetch("https://swapi.dev/api/people/");
    const result = response.json().then((data) => data.results);
    return result;
  }
);

const charactersListSlice = createSlice({
  name: "charactersList",
  initialState: {
    charactersList: [],
    loading: false,
  },
  reducers: {
    addCharacter: (state, action) => {
      const newCharacter = {
        name: action.payload.name,
        gender: action.payload.gender,
        hair_color: action.payload.hair_color,
      };
      state.charactersList.push(newCharacter);
    },
    deleteCharacter: (state, action) => {
      state.charactersList = state.charactersList.filter(
        (character) => character.name !== action.payload.name
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCharactersList.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getCharactersList.fulfilled, (state, action) => {
        state.loading = false;
        state.charactersList = action.payload;
      }),
      builder.addCase(getCharactersList.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { addCharacter, deleteCharacter } = charactersListSlice.actions;
export default charactersListSlice.reducer;
