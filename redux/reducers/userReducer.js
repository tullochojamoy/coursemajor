import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,

    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,

    USER_SIGNOUT,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
} from '../constants/userConstants';

export const userSigninReducer = (state = {}, action) => {
    switch (action.type){
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { userInfo: action.payload, loading: false };
        case USER_SIGNIN_FAIL:
            return { error: action.payload, loading: false };
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
};


export const userSignUpReducer = (state = {}, action) => {
    switch (action.type){
        case USER_SIGNUP_REQUEST:
            return { loading: true };
        case USER_SIGNUP_SUCCESS:
            return { userInfo: action.payload, loading: false };
        case USER_SIGNUP_FAIL:
            return { error: action.payload, loading: false };
        default:
            return state;
    }
};


export const userDetailsReducer = (state = { loading: true, success: false }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload, success: true };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};