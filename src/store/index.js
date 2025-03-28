import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducers from './user/userReducer';
import electorialReducer from './user/ElectorialReducer';
import adminReducer from './user/adminReducer';

const rootReducer = combineReducers({
    user: userReducers,
    admin: adminReducer,
    electorial : electorialReducer
});

const persistConfig = {
    key : 'root',
    storage,
    version: 1
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false,
    })
});

export const persistor = persistStore(store);