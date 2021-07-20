import { all, takeLatest } from 'redux-saga/effects';
import { SignIn, SingOut, setToken } from './users/saga';

export default function* rootSaga() {
  return yield all([
    takeLatest('@auth/SIGN_IN_REQUEST', SignIn),
    takeLatest('@auth/SIGN_OUT', SingOut),
    takeLatest('persist/REHYDRATE', setToken),
  ]);
}
