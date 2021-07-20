import React from 'react';
import Route from './routes';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store from './store/index';

export default function App() {
    return (
        <Provider store={store.store}>
            <PersistGate persistor={store.persist}>
                <NavigationContainer>
                    <Route />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
