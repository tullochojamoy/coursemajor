import {
    PAYPAL_PAYOUT_REQUEST,
    PAYPAL_PAYOUT_SUCCESS,
    PAYPAL_PAYOUT_FAIL,
} from '../constants/paypalConstants';

export const paypalPayoutReducer = (state = {paypal: {}, loading:false, success:false, error:null}, action) => {
    switch (action.type){
        case PAYPAL_PAYOUT_REQUEST:
            return { loading: true };
        case PAYPAL_PAYOUT_SUCCESS:
            return { paypal: action.payload, loading: false, success: true };
        case PAYPAL_PAYOUT_FAIL:
            return { error: action.payload, loading: false };
        default:
            return state;
    }
};