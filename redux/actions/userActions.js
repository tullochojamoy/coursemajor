import Axios from 'axios';

import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from '../constants/userConstants';

export const facebookRegisterLogin = (response) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  try {
    const config = {
      header: { 'Content-Type': 'application/json' },
    };

    const { data } = await Axios.post(
      'https://coursemajor.vercel.app/api/auth/facebookRegisterLogin',
      { response },
      config
    );
    //console.log(data);

    //data.token=response.accessToken;
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userInfo', JSON.stringify(data));
    //dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_SIGNUP_FAIL, payload: error.response.data.error });
  }
};

export const googleRegisterLogin = (result, token) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  try {
    const username = result?.name;
    const email = result?.email;
    const googleId = result?.googleId;
    const imageUrl = result?.imageUrl;
    console.log(googleId);

    const config = {
      header: { 'Content-Type': 'application/json' },
    };

    const { data } = await Axios.post(
      'https://coursemajor.vercel.app/api/auth/googleRegisterLogin',
      { username, email, googleId, imageUrl },
      config
    );
    console.log(data);

    data.token = token;
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userInfo', JSON.stringify(data));
    //dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_SIGNUP_FAIL, payload: error.response.data.error });
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const config = {
      header: { 'Content-Type': 'application/json' },
    };
    const { data } = await Axios.post(
      'https://coursemajor.vercel.app/api/auth/login',
      { email, password },
      config
    );

    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  try {
    const config = {
      header: { 'Content-Type': 'application/json' },
    };

    const { data } = await Axios.post(
      'https://coursemajor.vercel.app/api/auth/register',
      { username, email, password },
      config
    );
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_SIGNUP_FAIL, payload: error.response.data.error });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('authToken');
  dispatch({ type: USER_SIGNOUT });
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`https://coursemajor.vercel.app/api/auth/`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

export const updateUser =
  (paypalId, paypalEmail) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      const { data } = await Axios.put(
        `https://coursemajor.vercel.app/api/auth/`,
        { paypalId, paypalEmail },
        config
      );
      dispatch(detailsUser());
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_DETAILS_FAIL, payload: message });
    }
  };
