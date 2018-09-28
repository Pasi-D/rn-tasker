import { combineReducers } from "redux";
import taskReducer from './taskReducer';

const rootReducers = combineReducers({
    tasks: taskReducer
})

export default rootReducers;

