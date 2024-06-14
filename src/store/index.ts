import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/authentication/authSlice';
import vehicleReducer from '../features/drawer/vehicleSlice';
import leadReducer from '../features/leads/leadSlice';
import orderReducer from '../features/orders/orderSlice';
import quoteConvertReducer from '../features/quotes/quoteConvertSlice';
import quoteReducer from '../features/quotes/quoteSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  vehicle: vehicleReducer,
  lead: leadReducer,
  quote: quoteReducer,
  quoteConvert: quoteConvertReducer,
  order: orderReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
export default store;
