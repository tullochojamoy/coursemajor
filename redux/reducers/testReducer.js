/* eslint-disable no-unused-vars */
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
    VIDEO_PERCENTAGE_SET
} from '../constants/testConstants';

const initialState = {tests: [], loading:true, error:null};

export const testListReducer = (state = initialState, action) => {
    switch (action.type){
        case TEST_LIST_REQUEST:
            return { loading: true };
        case TEST_LIST_SUCCESS:
            return {
                tests: action.payload, 
                loading: false
            };
        case TEST_LIST_FAIL:
            return {
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export const testDetailsReducer = (state = {test: {}, loading:true }, action) => {
    switch (action.type) {
        case TEST_DETAILS_REQUEST:
            return { loading: true };
        case TEST_DETAILS_SUCCESS:
            return { loading: false, test: action.payload };
        case TEST_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

//export const VIDEO_PERCENTAGE_SET = 'VIDEO_PERCENTAGE_SET';
export const testCreateReducer = (state = {percent: 0, loading:true }, action) => {
    switch (action.type) {
        case TEST_DETAILS_REQUEST:
            return { loading: true };
        case VIDEO_PERCENTAGE_SET:
            return { loading: false, percent: action.payload };
        case TEST_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};