import {    
    GET_TASKS,
    GET_TASK,
    API_FAIL
} from '../actions/types'

const initialState = {
    tasks: null, //for all tasks in calling 
    task: null,   //for an individual task
    errors: null, //
    loading: true
}

export default function(state=initialState, action){
    switch (action.type) { 
        // GET all Tasks       
        case GET_TASKS:            
            return {
                ...state,
                loading: false,
                tasks: action.payload
            };
        // GET a Task            
        case GET_TASK:
            return {
                ...state,
                loading: false,
                task: action.payload
            };
        // API Failure
        case API_FAIL:
            return {
                ...state,
                loading: false,
                errors: action.err
            }
        default:
            return state;
    }
}