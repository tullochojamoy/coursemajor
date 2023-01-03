import Axios from 'axios';

import {
  PLAYLIST_DETAILS_REQUEST,
  PLAYLIST_DETAILS_SUCCESS,
  PLAYLIST_DETAILS_FAIL,
  PLAYLIST_CREATE_REQUEST,
  PLAYLIST_CREATE_SUCCESS,
  PLAYLIST_CREATE_FAIL,
  PLAYLIST_UPDATE_REQUEST,
  PLAYLIST_UPDATE_SUCCESS,
  PLAYLIST_UPDATE_FAIL,
} from '../constants/videoConstants';

import { COURSE_PERCENTAGE_SET } from '../constants/courseConstants';

export const playlistDetails = (courseId) => async (dispatch, getState) => {
  dispatch({ type: PLAYLIST_DETAILS_REQUEST, payload: courseId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await Axios.get(
      `http://localhost:3000/api/playlist/getPlaylist/${courseId}`,
      {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      }
    );

    dispatch({ type: PLAYLIST_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PLAYLIST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const playlistCreate = (courseId) => async (dispatch, getState) => {
  dispatch({ type: PLAYLIST_CREATE_REQUEST });
  try {
    const { userSignin: { userInfo }, } = getState();
    const { data } = await Axios.post(
      `http://localhost:3000/api/playlist/create/${courseId}`,
      {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      }
    );
    //console.log(data);
    //console.log("play create");
    dispatch({ type: PLAYLIST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PLAYLIST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const playlistUpdate =
  (courseId, playlistTitle, playlistDescription, file) =>
  async (dispatch, getState) => {
    dispatch({ type: PLAYLIST_UPDATE_REQUEST });

    let formData = new FormData();
    formData.append('Title', playlistTitle);
    formData.append('Description', playlistDescription);
    formData.append('video', file);

    const { userSignin: { userInfo }, } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
        'content-type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          //setUploadPercentage(percent);
          dispatch({ type: COURSE_PERCENTAGE_SET, payload: percent });
        }
      },
    };

    try {
      const { data } = Axios.put(
        `http://localhost:3000/api/playlist/addToPlaylist/${courseId}`,
        formData,
        config
      )
        .then((response) => {
          dispatch(playlistDetails(courseId));
          dispatch({ type: COURSE_PERCENTAGE_SET, payload: 100 });
          setTimeout(() => {
            //setUploadPercentage(0);
            dispatch({ type: COURSE_PERCENTAGE_SET, payload: 0 });
          }, 1000);
        })
        .catch((err) => {
          //console.log(err)
        });

      dispatch({ type: PLAYLIST_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PLAYLIST_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const playlistArrange =
  (numToUpdate, upDown, courseId) => async (dispatch, getState) => {
    dispatch({ type: PLAYLIST_UPDATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      let up = false;
      let down = false;

      if (upDown === 'up') {
        up = true;
        down = false;
      }
      if (upDown === 'down') {
        up = false;
        down = true;
      }

      const { data } = await Axios.put(
        `http://localhost:3000/api/playlist/arrange/${courseId}`,
        { numToUpdate, up, down },
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        }
      );
      dispatch({ type: PLAYLIST_UPDATE_SUCCESS, payload: data });

      dispatch(playlistDetails(courseId));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PLAYLIST_UPDATE_FAIL, payload: message });
    }
  };

export const playlistVideoUpdate =
  (numToUpdate, title, description, courseId) => async (dispatch, getState) => {
    dispatch({ type: PLAYLIST_UPDATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();

    try {
      const { data } = await Axios.put(
        `http://localhost:3000/api/playlist/updateVideoDetails/${courseId}`,
        { numToUpdate, title, description },
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        }
      );
      dispatch({ type: PLAYLIST_UPDATE_SUCCESS, payload: data });

      dispatch(playlistDetails(courseId));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PLAYLIST_UPDATE_FAIL, payload: message });
    }
  };

export const playlistDelete =
  (numberToRemove, courseId) => async (dispatch, getState) => {
    dispatch({ type: PLAYLIST_UPDATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      console.log(numberToRemove);
      const { data } = await Axios.patch(
        `http://localhost:3000/api/playlist/remove/${courseId}`,
        { numberToRemove },
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        }
      );
      dispatch({ type: PLAYLIST_UPDATE_SUCCESS, payload: data });

      dispatch(playlistDetails(courseId));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PLAYLIST_UPDATE_FAIL, payload: message });
    }
  };
