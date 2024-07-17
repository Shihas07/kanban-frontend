import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 


import taskReducer from "./slice";


const persistConfig = {
  key: 'root',
  storage,
  
}
const rootReducer=combineReducers({
   tasks:taskReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
});

export const persister=persistStore(store)