import {
    configureStore,
} from "@reduxjs/toolkit";
import { logger } from 'redux-logger';
import reducer  from './reducer';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import asyncActionMessages from '../middlewares/asyncActionMessages';
// const logger = createLogger({ collapsed: true });

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["alert"],
};

const persistedReducer = persistReducer<RootState>(persistConfig, reducer) as any;

export function makeStore() {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                serializableCheck: false,
                // @ts-ignore
            }).concat(logger).concat(asyncActionMessages);
        },
        devTools: true
    });
};

const initStore = makeStore();
export type RootState = ReturnType<typeof initStore.getState>;
export type AppDispatch = typeof initStore.dispatch;
export default initStore;
export const persistedStore = persistStore(initStore) as any;