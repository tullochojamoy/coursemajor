import Axios from 'axios';

import {
  TEST_LIST_REQUEST,
  TEST_LIST_SUCCESS,
  TEST_LIST_FAIL,
  TEST_DETAILS_REQUEST,
  TEST_DETAILS_SUCCESS,
  TEST_DETAILS_FAIL,
  TEST_CREATE_REQUEST,
  TEST_CREATE_SUCCESS,
  TEST_CREATE_FAIL,
  TEST_UPDATE_REQUEST,
  TEST_UPDATE_SUCCESS,
  TEST_UPDATE_FAIL,
  VIDEO_PERCENTAGE_SET,
} from '../constants/testConstants';

import { playlistCreate } from './videoActions';

export const list_tests = () => async (dispatch) => {
  dispatch({ type: TEST_LIST_REQUEST });
  try {
    const { data } = await Axios.get('http://localhost:3000/api/tests');
    dispatch({ type: TEST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TEST_LIST_FAIL, payload: error.message });
  }
};

export const testsDetails = (testId) => async (dispatch) => {
  dispatch({ type: TEST_DETAILS_REQUEST, payload: testId });
  try {
    const { data } = await Axios.get(
      `http://localhost:3000/api/tests/${testId}`
    );
    dispatch({ type: TEST_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TEST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const testCreate = (testId) => async (dispatch) => {
  dispatch({ type: TEST_CREATE_REQUEST });
  try {
    const { data } = await Axios.post(`http://localhost:3000/api/tests/create`);
    console.log(data);
    dispatch(playlistCreate(data._id));
    dispatch({ type: TEST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TEST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const testUpdate = (data) => async (dispatch) => {
  dispatch({ type: TEST_CREATE_REQUEST });
  try {
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          //setUploadPercentage(percent);
          dispatch({ type: VIDEO_PERCENTAGE_SET, payload: percent });
        }
      },
    };
    Axios.put('/api/courses/6165e657e489b2496c9c1d70', data, options)
      .then((res) => {
        console.log(res);
        //setUploadPercentage(100);
        dispatch({ type: VIDEO_PERCENTAGE_SET, payload: 100 });
        setTimeout(() => {
          //setUploadPercentage(0);
          dispatch({ type: VIDEO_PERCENTAGE_SET, payload: 0 });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch({ type: TEST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TEST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
