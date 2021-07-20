import produce from 'immer';

const initialState = {
  token: '',
  signed: false,
  loading: false,
  error: null,
};

export default function users(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.loading = false;
        draft.signed = true;
        draft.token = action.payload;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        break;
      }
      case '@auth/SIGN_IN_FAILED': {
        draft.error = action.payload;
        break;
      }
      default:
    }
  });
}
