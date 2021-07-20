const initialState = {
    user: {},
    signed: false,
    loading: false,
    error: null,
};

export default function users(state = initialState, action) {
    switch (action.type) {
        case '@auth/SIGN_IN_REQUEST':
            return {
                loading: true,
                ...state,
            };
        case '@auth/SIGN_IN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                signed: true,
                loading: false,
            };
        case '@auth/SIGN_OUT':
            return {
                ...state,
                signed: false,
            };
        case '@auth/SIGN_IN_FAILED':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}
