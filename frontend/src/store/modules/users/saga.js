import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/Api';
import {
  getSessionSuccess,
  getSessionFailed,
} from '~/store/modules/users/action';

export function* SignIn({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const { token } = response.data;

    localStorage.setItem('token', token);

    history.push('/delivery/list');
    yield put(getSessionSuccess(token));
  } catch (error) {
    toast.error('Algo deu errado com a sua requisição');
    yield put(getSessionFailed('Usuario não encontrado/Senha errada'));
  }
}

export function setToken() {
  if (!localStorage.getItem('token')) return;

  const token = localStorage.getItem('token');

  if (token) {
    api.defaults.headers.authorization = token;
  }
}

export function SingOut() {
  localStorage.removeItem('token');
  toast.success('Sessão encerrada com sucesso!');
  history.push('/');
}
