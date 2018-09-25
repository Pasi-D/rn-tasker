import {    
    GET_TASKS,
    GET_TASK,
    API_FAIL,
    DELETED,
    ADDED
} from '../actions/types'

const initialState = {
    tasks: null, //for all tasks in calling 
    task: null,   //for an individual task
    errors: null, //
    loading: true,
    deleted: false,
    added: false
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
        // On Deleting a task
        case DELETED: 
            return {
                ...state,
                loading: false,
                deleted: action.delStatus
            }
        // On Adding a task
        case ADDED:
            return {
                ...state,
                loading: false,
                added: action.addStatus
            }
        default:
            return state;
    }
}