import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  menus: [],
  currentMenu: null,
  loading: false,
  error: null,
}

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus: (state, action) => {
      state.menus = action.payload
    },
    setCurrentMenu: (state, action) => {
      state.currentMenu = action.payload
    },
    addMenu: (state, action) => {
      state.menus.push(action.payload)
    },
    updateMenu: (state, action) => {
      const index = state.menus.findIndex(menu => menu._id === action.payload._id)
      if (index !== -1) {
        state.menus[index] = action.payload
      }
    },
    deleteMenu: (state, action) => {
      state.menus = state.menus.filter(menu => menu._id !== action.payload)
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
  setMenus, 
  setCurrentMenu, 
  addMenu, 
  updateMenu, 
  deleteMenu, 
  setLoading, 
  setError, 
  clearError 
} = menuSlice.actions

export default menuSlice.reducer