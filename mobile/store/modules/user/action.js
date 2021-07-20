export function getSession(id) {
    return {
        type: '@auth/SIGN_IN_REQUEST',
        payload: { id },
    };
}

export function getSessionSuccess(user) {
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: { user },
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
