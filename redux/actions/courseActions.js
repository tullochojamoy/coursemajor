import Axios from 'axios';

import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  
  COURSE_SEARCH_LIST_REQUEST,
  COURSE_SEARCH_LIST_SUCCESS,
  COURSE_SEARCH_LIST_FAIL,

  COURSE_PURCHASED_LIST_REQUEST,
  COURSE_PURCHASED_LIST_SUCCESS,
  COURSE_PURCHASED_LIST_FAIL,

  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,

  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
  COURSE_CREATE_FAIL,

  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_FAIL,

  COURSE_PERCENTAGE_SET,
} from '../constants/courseConstants';

import { playlistCreate } from './videoActions';

export const list_courses = () => async (dispatch) => {
  dispatch({ type: COURSE_LIST_REQUEST });
  try {
    const { data } = await Axios.get(
      'https://coursemajor.vercel.app/api/courses'
    );
    dispatch({ type: COURSE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: COURSE_LIST_FAIL, payload: error.message });
  }
};

export const listPurchasedCourses = () => async (dispatch, getState) => {
  dispatch({ type: COURSE_PURCHASED_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await Axios.get(
      'https://coursemajor.vercel.app/api/courses/purchased',
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );

    dispatch({ type: COURSE_PURCHASED_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: COURSE_PURCHASED_LIST_FAIL, payload: error.message });
  }
};

export const coursesDetails = (courseId) => async (dispatch) => {
  dispatch({ type: COURSE_DETAILS_REQUEST, payload: courseId });
  try {
    const { data } = await Axios.get(
      `https://coursemajor.vercel.app/api/courses/getCourse/${courseId}`
    );
    dispatch({ type: COURSE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const courseCreate = (courseId) => async (dispatch, getState) => {
  dispatch({ type: COURSE_CREATE_REQUEST });
  try {
    const { userSignin: { userInfo }, } = getState();

    /*
        const {data} = await Axios.post('https://coursemajor.vercel.app/api/courses/create',
        { headers: { Authorization: `Bearer ${userInfo.token}` }, }
        );
        */

    const { data } = await Axios({
      method: 'post',
      url: `https://coursemajor.vercel.app/api/courses/create`,
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    if (data) {
      dispatch(playlistCreate(data._id));
      dispatch({ type: COURSE_CREATE_SUCCESS, payload: data });
    }

    console.log(data);
  } catch (error) {
    console.log('Error');
    dispatch({
      type: COURSE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const courseUpdate = (courseId, formData) => async (dispatch, getState) => {
    dispatch({ type: COURSE_UPDATE_REQUEST });
    const {userSignin: { userInfo }} = getState();
    try {
      console.log(formData);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          'content-type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          if (percent < 100) {
            //setUploadPercentage(percent);
            //console.log(percent);
            //console.log('lol');
            dispatch({ type: COURSE_PERCENTAGE_SET, payload: percent });
            }
          }
      
      };

      //console.log(formData);
      console.log('reached');
      
      const { data } = await Axios.put(`https://coursemajor.vercel.app/api/courses/updateCourse/${courseId}`,formData, config)
        .then(res => {
          console.log('This is the response ',res);
          //setUploadPercentage(100);
          dispatch({ type: COURSE_PERCENTAGE_SET, payload: 100 });
          setTimeout(() => {
            //setUploadPercentage(0);
            dispatch({ type: COURSE_PERCENTAGE_SET, payload: 0 });
            }, 1000);
            dispatch(coursesDetails(courseId));
            dispatch({ type: COURSE_UPDATE_SUCCESS, payload: data });
          })
        .catch(err => {
          //console.log(err);
        });

    } catch (error) {
      dispatch({
        type: COURSE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const coursePublish =
  (courseId,trueF) => async (dispatch, getState) => {
    dispatch({ type: COURSE_UPDATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    console.log('action hit');
    try {
      const { data } = await Axios.put(
        `https://coursemajor.vercel.app/api/courses/published/${courseId}`,
        trueF,
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        }
      );
      dispatch({ type: COURSE_UPDATE_SUCCESS, payload: data });

      dispatch(coursesDetails(courseId));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: COURSE_UPDATE_FAIL, payload: message });
    }
  };


  export const courseSearch = (searchTerm) => async (dispatch) => {
  dispatch({ type: COURSE_SEARCH_LIST_REQUEST });
  try {
    const { data } = await Axios.get(
      `https://coursemajor.vercel.app/api/courses/search/${searchTerm}`
    );
    dispatch({ type: COURSE_SEARCH_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: COURSE_SEARCH_LIST_FAIL, payload: error.message });
  }
};