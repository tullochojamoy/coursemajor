import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { courseListReducer, coursePurchasedListReducer, courseDetailsReducer, courseCreateReducer, courseUpdateReducer, coursePercentReducer, courseSearchListReducer } from './reducers/courseReducer';
import { resourceListReducer, resourcePurchasedListReducer, resourceDetailsReducer, resourceCreateReducer, resourceUpdateReducer, resourcePercentReducer, resourceSearchListReducer } from './reducers/resourceReducer';
import { reviewListReducer, reviewDetailsReducer, reviewCreateReducer, reviewUpdateReducer } from './reducers/reviewReducer';
import { playlistCreateReducer, playlistDetailsReducer, playlistUpdateReducer } from './reducers/videoReducer';
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers';
import { paypalPayoutReducer } from './reducers/paypalReducer';
import { userSigninReducer, userDetailsReducer, userSignUpReducer } from './reducers/userReducer';
import { testListReducer, testDetailsReducer, testCreateReducer } from './reducers/testReducer';

const ISSERVER = typeof window === 'undefined';
//if (!ISSERVER) localStorage.setItem(key, value);

const initialState = {

    userSignin: {
        userInfo: !ISSERVER && localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    }
    
};



//typeof window !== “undefined” && window.localStorage



const reducer = combineReducers({
    courseList: courseListReducer,
    coursePurchasedList: coursePurchasedListReducer,
    courseSearchList: courseSearchListReducer,
    courseDetails: courseDetailsReducer,
    courseCreate: courseCreateReducer,
    courseUpdate: courseUpdateReducer,
    coursePercent: coursePercentReducer,

    resourceList: resourceListReducer,
    resourcePurchasedList: resourcePurchasedListReducer,
    resourceSearchList: resourceSearchListReducer,
    resourceDetails: resourceDetailsReducer,
    resourceCreate: resourceCreateReducer,
    resourceUpdate: resourceUpdateReducer,
    resourcePercent: resourcePercentReducer,

    reviewList: reviewListReducer,
    reviewDetails: reviewDetailsReducer,
    reviewCreate: reviewCreateReducer,
    reviewUpdate: reviewUpdateReducer,

    paypalPayout: paypalPayoutReducer,

    userSignin: userSigninReducer,
    userDetails: userDetailsReducer,
    userSignup: userSignUpReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    
    playlistCreate: playlistCreateReducer,
    playlistDetails: playlistDetailsReducer,
    playlistUpdate: playlistUpdateReducer,

    testList: testListReducer,
    testDetails: testDetailsReducer,
    testCreate: testCreateReducer,
});
const composeEnhancer = !ISSERVER && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;