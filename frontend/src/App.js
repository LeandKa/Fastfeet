import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import history from '~/services/history';
import store from '~/store/store';
import 'react-toastify/dist/ReactToastify.min.css';
import Routes from './routes/Routes';
import GlobalStyle from './style/global';

function App() {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persist}>
        <Router history={history}>
          <GlobalStyle>
            <Routes />
            <ToastContainer
              autoClose={3000}
              hideProgressBar
              position="top-right"
              closeOnClick
            />
          </GlobalStyle>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
