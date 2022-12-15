import {
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
    REVIEW_LIST_FAIL,

    REVIEW_PURCHASED_LIST_REQUEST,
    REVIEW_PURCHASED_LIST_SUCCESS,
    REVIEW_PURCHASED_LIST_FAIL,

    REVIEW_DETAILS_REQUEST,
    REVIEW_DETAILS_SUCCESS,
    REVIEW_DETAILS_FAIL, 
    REVIEW_CREATE_REQUEST,
    REVIEW_CREATE_SUCCESS,
    REVIEW_CREATE_FAIL,
    REVIEW_UPDATE_REQUEST,
    REVIEW_UPDATE_SUCCESS,
    REVIEW_UPDATE_FAIL
} from '../constants/reviewConstants';

export const reviewListReducer = (state = {reviews: [], loading:true, error:null}, action) => {
    switch (action.type){
        case REVIEW_LIST_REQUEST:
            return { loading: true };
        case REVIEW_LIST_SUCCESS:
            return { reviews: action.payload, loading: false };
        case REVIEW_LIST_FAIL:
            return { error: action.payload, loading: false };
        default:
            return state;
    }
};

export const reviewPurchasedListReducer = (state = {reviews: [], loading:true, error:null}, action) => {
    switch (action.type){
        case REVIEW_PURCHASED_LIST_REQUEST:
            return { loading: true };
        case REVIEW_PURCHASED_LIST_SUCCESS:
            return { reviews: action.payload, loading: false };
        case REVIEW_PURCHASED_LIST_FAIL:
            return { error: action.payload, loading: false };
        default:
            return state;
    }
};

export const reviewDetailsReducer = (state = {review: {}, loading:true }, action) => {
    switch (action.type) {
        case REVIEW_DETAILS_REQUEST:
            return { loading: true };
        case REVIEW_DETAILS_SUCCESS:
            return { loading: false, review: action.payload };
        case REVIEW_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const reviewCreateReducer = (state = {review: {}, loading:true }, action) => {
    switch (action.type) {
        case REVIEW_CREATE_REQUEST:
            return { loading: true };
        case REVIEW_CREATE_SUCCESS:
            return { loading: false, review: action.payload };
        case REVIEW_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const reviewUpdateReducer = (state = {review: {}, success: false, loading:true }, action) => {
    switch (action.type) {
        case REVIEW_UPDATE_REQUEST:
            return { loading: true };
        case REVIEW_UPDATE_SUCCESS:
            return { loading: false, success: true, review: action.payload };
        case REVIEW_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};