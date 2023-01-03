import Axios from 'axios';

import {
  PAYPAL_PAYOUT_REQUEST,
  PAYPAL_PAYOUT_SUCCESS,
  PAYPAL_PAYOUT_FAIL,
} from '../constants/paypalConstants';

import { detailsUser } from './userActions';

export const paypalPayout = () => async (dispatch, getState) => {
  dispatch({ type: PAYPAL_PAYOUT_REQUEST });
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
    const { data } = await Axios.get(
      `http://localhost:3000/api/paypal/paypal-payout`,
      config
    );
    dispatch(detailsUser());
    dispatch({ type: PAYPAL_PAYOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PAYPAL_PAYOUT_FAIL, payload: error.message });
  }
};
