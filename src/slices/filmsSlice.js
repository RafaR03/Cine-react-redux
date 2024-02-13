import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  films: [],
}

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilms: (state, action) => {
      state.films = action.payload

    }
  },
})

// Action creators are generated for each case reducer function
export const { setFilms } = filmsSlice.actions
