import Axios from 'axios';

import {
  RESOURCE_LIST_REQUEST,
  RESOURCE_LIST_SUCCESS,
  RESOURCE_LIST_FAIL,
  RESOURCE_SEARCH_LIST_REQUEST,
  RESOURCE_SEARCH_LIST_SUCCESS,
  RESOURCE_SEARCH_LIST_FAIL,
  RESOURCE_PURCHASED_LIST_REQUEST,
  RESOURCE_PURCHASED_LIST_SUCCESS,
  RESOURCE_PURCHASED_LIST_FAIL,
  RESOURCE_DETAILS_REQUEST,
  RESOURCE_DETAILS_SUCCESS,
  RESOURCE_DETAILS_FAIL,
  RESOURCE_CREATE_REQUEST,
  RESOURCE_CREATE_SUCCESS,
  RESOURCE_CREATE_FAIL,
  RESOURCE_UPDATE_REQUEST,
  RESOURCE_UPDATE_SUCCESS,
  RESOURCE_UPDATE_FAIL,
  RESOURCE_PERCENTAGE_SET,
} from '../constants/resourceConstants';

import { playlistCreate } from './videoActions';

export const list_resources = () => async (dispatch) => {
  dispatch({ type: RESOURCE_LIST_REQUEST });
  try {
    const { data } = await Axios.get('https://coursemajor.vercel.app/api/resources');
    dispatch({ type: RESOURCE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RESOURCE_LIST_FAIL, payload: error.message });
  }
};

export const listPurchasedResources = () => async (dispatch, getState) => {
  dispatch({ type: RESOURCE_PURCHASED_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await Axios.get(
      'https://coursemajor.vercel.app/api/resources/purchased',
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );

    dispatch({ type: RESOURCE_PURCHASED_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RESOURCE_PURCHASED_LIST_FAIL, payload: error.message });
  }
};

export const resourcesDetails = (resourceId) => async (dispatch) => {
  dispatch({ type: RESOURCE_DETAILS_REQUEST, payload: resourceId });
  try {
    const { data } = await Axios.get(
      `https://coursemajor.vercel.app/api/resources/${resourceId}`
    );
    dispatch({ type: RESOURCE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESOURCE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resourceCreate = (resourceId) => async (dispatch, getState) => {
  dispatch({ type: RESOURCE_CREATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    /*
        const {data} = await Axios.post('https://coursemajor.vercel.app/api/resources/create',
        { headers: { Authorization: `Bearer ${userInfo.token}` }, }
        );
        */

    const { data } = await Axios({
      method: 'post',
      url: `/api/resources/create`,
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    if (data) {
      dispatch(playlistCreate(data._id));
      dispatch({ type: RESOURCE_CREATE_SUCCESS, payload: data });
    }

    console.log(data);
  } catch (error) {
    console.log('Error');
    dispatch({
      type: RESOURCE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resourceUpdate =
  (resourceId, formData) => async (dispatch, getState) => {
    dispatch({ type: RESOURCE_UPDATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
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
            //console.log(percent);
            console.log('lol');
            dispatch({ type: RESOURCE_PERCENTAGE_SET, payload: percent });
          }
        },
      };
      const { data } = await Axios.put(
        `https://coursemajor.vercel.app/api/resources/${resourceId}`,
        formData,
        config
      )
        .then((res) => {
          console.log(res);
          //setUploadPercentage(100);
          dispatch({ type: RESOURCE_PERCENTAGE_SET, payload: 100 });
          setTimeout(() => {
            //setUploadPercentage(0);
            dispatch({ type: RESOURCE_PERCENTAGE_SET, payload: 0 });
          }, 1000);
          dispatch(resourcesDetails(resourceId));
          dispatch({ type: RESOURCE_UPDATE_SUCCESS, payload: data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      dispatch({
        type: RESOURCE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const resourcePublish =
  (resourceId, trueF) => async (dispatch, getState) => {
    dispatch({ type: RESOURCE_UPDATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    console.log('action hit');
    try {
      const { data } = await Axios.put(
        `https://coursemajor.vercel.app/api/resources/published/${resourceId}`,
        trueF,
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        }
      );
      dispatch({ type: RESOURCE_UPDATE_SUCCESS, payload: data });

      dispatch(resourcesDetails(resourceId));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: RESOURCE_UPDATE_FAIL, payload: message });
    }
  };

export const resourceSearch = (searchTerm) => async (dispatch) => {
  dispatch({ type: RESOURCE_SEARCH_LIST_REQUEST });
  try {
    const { data } = await Axios.get(
      `https://coursemajor.vercel.app/api/resources/search/${searchTerm}`
    );
    dispatch({ type: RESOURCE_SEARCH_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RESOURCE_SEARCH_LIST_FAIL, payload: error.message });
  }
};
