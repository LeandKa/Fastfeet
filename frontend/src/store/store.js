import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const persistedReducr = persistReducer(persistConfig, rootReducer);

const composer = compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension && window.devToolsExtension()
);

const store = createStore(persistedReducr, composer);
const persist = persistStore(store);

sagaMiddleware.run(rootSaga);

export default { store, persist };
