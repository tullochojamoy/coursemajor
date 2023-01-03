import Axios from 'axios';

import {
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_DETAILS_REQUEST,
  REVIEW_DETAILS_SUCCESS,
  REVIEW_DETAILS_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_UPDATE_REQUEST,
  REVIEW_UPDATE_SUCCESS,
  REVIEW_UPDATE_FAIL,
} from '../constants/reviewConstants';

export const listReviews = (courseId) => async (dispatch) => {
  dispatch({ type: REVIEW_LIST_REQUEST });
  try {
    const { data } = await Axios.get(
      `http://localhost:3000/api/reviews/all/${courseId}`
    );
    dispatch({ type: REVIEW_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REVIEW_LIST_FAIL, payload: error.message });
  }
};

export const reviewDetails = (courseId) => async (dispatch) => {
  dispatch({ type: REVIEW_DETAILS_REQUEST, payload: courseId });
  try {


    const { data } = await Axios.put(`http://localhost:3000/api/reviews/course/${courseId}`)
      .then((res) => {
        dispatch({ type: REVIEW_DETAILS_SUCCESS, payload: res.reviews });
      })
      .catch((error) => {
        //console.log('lol this')
        error.response='No Reviews';
        error.response.data.message='No Reviews';
        dispatch({
          type: REVIEW_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });

  } catch (error) {
    console.log('lol')
    dispatch({
      type: REVIEW_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reviewCreate =
  (courseId, review, reviewTitle, reviewMessage) =>
  async (dispatch, getState) => {
    dispatch({ type: REVIEW_CREATE_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();

      const { data } = await Axios.post(
        `http://localhost:3000/api/reviews/createorupdate/${courseId}`,
        { review, reviewTitle, reviewMessage },
        { headers: { Authorization: `Bearer ${userInfo?.token}` } }
      );
      dispatch(reviewDetails(courseId));
      dispatch({ type: REVIEW_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REVIEW_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const reviewUpdate =
  (courseId, review, reviewTitle, reviewMessage) =>
  async (dispatch, getState) => {
    dispatch({ type: REVIEW_UPDATE_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();

      const { data } = await Axios.post(
        `http://localhost:3000/api/reviews/createorupdate/${courseId}`,
        { review, reviewTitle, reviewMessage },
        { headers: { Authorization: `Bearer ${userInfo?.token}` } }
      );
      dispatch(reviewDetails(courseId));
      dispatch({ type: REVIEW_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REVIEW_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
