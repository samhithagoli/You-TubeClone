// reducers/index.js
import { combineReducers } from 'redux';
// Import your individual reducers here
// import someReducer from './someReducer';
import authReducer from './auth';
import channelReducers from "./channel";
import currentUserReducer from './currentUser'
import videoReducer from '../Reducers/video'
import likedVideoReducer from "./likedVideo";
import watchLaterReducer from "./watchLater";
import commentReducer from "./comments";
import HistoryReducer from "./history";

export default combineReducers({
  authReducer,
  currentUserReducer,
  channelReducers
  ,videoReducer,
  likedVideoReducer,
  watchLaterReducer,
  HistoryReducer,commentReducer
}

);
