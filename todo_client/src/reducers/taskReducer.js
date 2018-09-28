import {    
    GET_TASKS,
    GET_TASK,
    API_FAIL,
    DELETED,
    ADDED,
    FLUSH,
    SET_STATE
} from '../actions/types'

const initialState = {
    tasks: null, //for all tasks in calling 
    task: null,   //for an individual task
    errors: null, //
    loading: true,
    deleted: false,
    added: false
}

function setState(state, newState){
    return {
        ...state,
        ...newState
    }
}

function flushState(){
    return {};
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
        // Clears all states            
        case FLUSH:
            return flushState() 
        // Sets to a new State            
        case SET_STATE:
            return setState(state, action.state)
        default:
            return state;
    }
}