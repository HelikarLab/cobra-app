import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import dataReducer from './reducers/dataReducer'

const rootPersistConfig = {
  key: 'root',
  storage: storageSession
}

const rootReducer = combineReducers({data: dataReducer})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

export const store = createStoreWithMiddleware(persistedReducer)

export const persistor = persistStore(store)
