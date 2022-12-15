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

    COURSE_PERCENTAGE_REQUEST,
    COURSE_PERCENTAGE_SET,
    COURSE_PERCENTAGE_FAIL,
} from '../constants/courseConstants';

export const courseListReducer = (state = {courses: [], loading:true, error:null}, action) => {
    switch (action.type){
        case COURSE_LIST_REQUEST:
            return { loading: true };
        case COURSE_LIST_SUCCESS:
            return { courses: action.payload, loading: false };
        case COURSE_LIST_FAIL:
            return { error: action.payload, loading: false };
        default:
            return state;
    }
};

export const coursePurchasedListReducer = (state = {courses: [], loading:true, error:null}, action) => {
    switch (action.type){
        case COURSE_PURCHASED_LIST_REQUEST:
            return { loading: true };
        case COURSE_PURCHASED_LIST_SUCCESS:
            return { courses: action.payload, loading: false };
        case COURSE_PURCHASED_LIST_FAIL:
            return { error: action.payload, loading: false };
        default:
            return state;
    }
};

export const courseDetailsReducer = (state = {course: {}, loading:true }, action) => {
    switch (action.type) {
        case COURSE_DETAILS_REQUEST:
            return { loading: true };
        case COURSE_DETAILS_SUCCESS:
            return { loading: false, course: action.payload };
        case COURSE_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const courseCreateReducer = (state = {course: {}, loading:true }, action) => {
    switch (action.type) {
        case COURSE_CREATE_REQUEST:
            return { loading: true };
        case COURSE_CREATE_SUCCESS:
            return { loading: false, course: action.payload };
        case COURSE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const courseUpdateReducer = (state = {course: {}, success: false, loading:false }, action) => {
    switch (action.type) {
        case COURSE_UPDATE_REQUEST:
            return { loading: true };
        case COURSE_UPDATE_SUCCESS:
            return { loading: false, success: true, course: action.payload };
        case COURSE_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const coursePercentReducer = (state = {percent: 0, loading:true }, action) => {
    switch (action.type) {
        case COURSE_PERCENTAGE_REQUEST:
            return { loading: true };
        case COURSE_PERCENTAGE_SET:
            return { loading: false, percent: action.payload };
        case COURSE_PERCENTAGE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const courseSearchListReducer = (state = {courses: [], loading:true, error:null}, action) => {
    switch (action.type){
        case COURSE_SEARCH_LIST_REQUEST:
            return { loading: true };
        case COURSE_SEARCH_LIST_SUCCESS:
            return { courses: action.payload, loading: false };
        case COURSE_SEARCH_LIST_FAIL:
            return { error: action.payload, loading: false };
        default:
            return state;
    }
};