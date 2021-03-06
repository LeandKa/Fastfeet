import { all, takeLatest } from 'redux-saga/effects';
import { SignIn } from './user/saga';

export default function* rootSaga() {
    return yield all([takeLatest('@auth/SIGN_IN_REQUEST', SignIn)]);
}
