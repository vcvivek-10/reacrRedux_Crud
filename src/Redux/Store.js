import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducer";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    users: userReducer
})
const store = configureStore({
    reducer: rootReducer,
    // middleware:[thunk,logger]
    middleware: (getDefaultMiddkeware) => getDefaultMiddkeware().concat(logger, thunk)
})
export default store