export function getSession(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function getSessionSet() {
  return {
    type: '@auth/SET_IN_REQUEST_TOKEN',
  };
}

export function getSessionSuccess(token) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token },
  };
}

export function getSessionFailed(message) {
  return {
    type: '@auth/SIGN_IN_FAILED',
    payload: message,
  };
}

export function getSessionOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
