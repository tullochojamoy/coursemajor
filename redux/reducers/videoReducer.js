import {
    PLAYLIST_LIST_REQUEST,
    PLAYLIST_LIST_SUCCESS,
    PLAYLIST_LIST_FAIL,
    PLAYLIST_DETAILS_REQUEST,
    PLAYLIST_DETAILS_SUCCESS,
    PLAYLIST_DETAILS_FAIL, 
    PLAYLIST_CREATE_REQUEST,
    PLAYLIST_CREATE_SUCCESS,
    PLAYLIST_CREATE_FAIL,
    PLAYLIST_UPDATE_REQUEST,
    PLAYLIST_UPDATE_SUCCESS,
    PLAYLIST_UPDATE_FAIL
} from '../constants/videoConstants';

const initialState = {courses: [], loading:true, error:null};

export const courseListReducer = (state = initialState, action) => {
    switch (action.type){
        case PLAYLIST_LIST_REQUEST:
            return { loading: true };
        case PLAYLIST_LIST_SUCCESS:
            return { courses: action.payload, loading: false };
        case PLAYLIST_LIST_FAIL:
            return { error: action.payload, loading: false };
        default:
            return state;
    }
};

export const playlistDetailsReducer = (state = {playlist: {}, loading:true }, action) => {
    switch (action.type) {
        case PLAYLIST_DETAILS_REQUEST:
            return { loading: true };
        case PLAYLIST_DETAILS_SUCCESS:
            return { loading: false, playlist: action.payload };
        case PLAYLIST_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const playlistCreateReducer = (state = {playlist: {}, loading:true }, action) => {
    switch (action.type) {
        case PLAYLIST_CREATE_REQUEST:
            return { loading: true };
        case PLAYLIST_CREATE_SUCCESS:
            return { loading: false, playlist: action.payload };
        case PLAYLIST_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const playlistUpdateReducer = (state = {playlist: {}, success: false, loading:true }, action) => {
    switch (action.type) {
        case PLAYLIST_UPDATE_REQUEST:
            return { loading: true };
        case PLAYLIST_UPDATE_SUCCESS:
            return { loading: false, success: true, playlist: action.payload };
        case PLAYLIST_UPDATE_FAIL:
            return { loading: false, success: true, error: action.payload };
        default:
            return state;
    }
};