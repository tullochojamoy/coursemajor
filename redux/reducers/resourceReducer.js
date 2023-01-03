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

    RESOURCE_PERCENTAGE_REQUEST,
    RESOURCE_PERCENTAGE_SET,
    RESOURCE_PERCENTAGE_FAIL,
} from '../constants/resourceConstants';

export const resourceListReducer = (state = {resources: [], loading:true, error:null}, action) => {
    switch (action.type){
        case RESOURCE_LIST_REQUEST:
            return { loading: true };
        case RESOURCE_LIST_SUCCESS:
            return { resources: action.payload, loading: false };
        case RESOURCE_LIST_FAIL:
            return { error: action.payload, loading: false };
        default:
            return state;
    }
};

export const resourcePurchasedListReducer = (state = {resources: [], loading:true, error:null}, action) => {
    switch (action.type){
        case RESOURCE_PURCHASED_LIST_REQUEST:
            return { loading: true };
        case RESOURCE_PURCHASED_LIST_SUCCESS:
            return { resources: action.payload, loading: false };
        case RESOURCE_PURCHASED_LIST_FAIL:
            return { error: action.payload, loading: false };
        default:
            return state;
    }
};

export const resourceDetailsReducer = (state = {resource: {}, loading:true }, action) => {
    switch (action.type) {
        case RESOURCE_DETAILS_REQUEST:
            return { loading: true };
        case RESOURCE_DETAILS_SUCCESS:
            return { loading: false, resource: action.payload };
        case RESOURCE_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const resourceCreateReducer = (state = {resource: {}, loading:true }, action) => {
    switch (action.type) {
        case RESOURCE_CREATE_REQUEST:
            return { loading: true };
        case RESOURCE_CREATE_SUCCESS:
            return { loading: false, resource: action.payload };
        case RESOURCE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const resourceUpdateReducer = (state = {resource: {}, success: false, loading:false }, action) => {
    switch (action.type) {
        case RESOURCE_UPDATE_REQUEST:
            return { loading: true };
        case RESOURCE_UPDATE_SUCCESS:
            return { loading: false, success: true, resource: action.payload };
        case RESOURCE_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const resourcePercentReducer = (state = {percent: 0, loading:true }, action) => {
    switch (action.type) {
        case RESOURCE_PERCENTAGE_REQUEST:
            return { loading: true };
        case RESOURCE_PERCENTAGE_SET:
            return { loading: false, percent: action.payload };
        case RESOURCE_PERCENTAGE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const resourceSearchListReducer = (state = {resources: [], loading:true, error:null}, action) => {
    switch (action.type){
        case RESOURCE_SEARCH_LIST_REQUEST:
            return { loading: true };
        case RESOURCE_SEARCH_LIST_SUCCESS:
            return { resources: action.payload, loading: false };
        case RESOURCE_SEARCH_LIST_FAIL:
            return { error: action.payload, loading: false };
        default:
            return state;
    }
};