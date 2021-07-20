import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/rootSaga';
import rootReducer from './modules/rootReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user'],
};

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const persistedReducr = persistReducer(persistConfig, rootReducer);

const composer = compose(applyMiddleware(...middlewares));

const store = createStore(persistedReducr, composer);
const persist = persistStore(store);

sagaMiddleware.run(rootSaga);

export default { store, persist };
