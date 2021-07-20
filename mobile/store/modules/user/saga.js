import { call, put } from 'redux-saga/effects';
import api from '../../../services/api';
import { getSessionSuccess, getSessionFailed, getSessionOut } from './action';

export function* SignIn({ payload }) {
    const { id } = payload;
    try {
        const response = yield call(api.get, `/deliveryman/${id}`);
        yield put(getSessionSuccess(response.data));
    } catch (error) {
        yield put(getSessionFailed('Usuario não encontrado'));
    }
}
