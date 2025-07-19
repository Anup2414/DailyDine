import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  messes: [],
  nearbyMesses: [],
  currentMess: null,
  loading: false,
  error: null,
}

const messSlice = createSlice({
  name: "mess",
  initialState,
  reducers: {
    setMesses: (state, action) => {
      state.messes = action.payload
    },
    setNearbyMesses: (state, action) => {
      state.nearbyMesses = action.payload
    },
    setCurrentMess: (state, action) => {
      state.currentMess = action.payload
    },
    addMess: (state, action) => {
      state.messes.push(action.payload)
    },
    updateMess: (state, action) => {
      const index = state.messes.findIndex(mess => mess._id === action.payload._id)
      if (index !== -1) {
        state.messes[index] = action.payload
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { 
  setMesses, 
  setNearbyMesses, 
  setCurrentMess, 
  addMess, 
  updateMess, 
  setLoading, 
  setError, 
  clearError 
} = messSlice.actions

export default messSlice.reducer