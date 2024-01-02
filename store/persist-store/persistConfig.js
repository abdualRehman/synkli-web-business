import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducers } from '../store';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['signup', 'login'], 
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;
