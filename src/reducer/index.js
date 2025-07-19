import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import menuReducer from "../slices/menuSlice"
import messReducer from "../slices/messSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  mess: messReducer,
})

export default rootReducer
