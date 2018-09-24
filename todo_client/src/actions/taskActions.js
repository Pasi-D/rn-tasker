import axios from 'axios';

import {
    GET_TASK,    
    GET_TASKS_API,
    DELETE_TASK,
    DELETED
} from './types'

//GET_TASKS
export const getTasks = () => dispatchEvent => {
    dispatchEvent(
        {
            type: GET_TASKS_API
        }
    )
}

export const deleteTask = (id) => dispatchEvent => {        
    dispatchEvent(
        {
            type: DELETE_TASK,
            id
        }
    )
}

// To make the deleted on redux store to make false
export const falsifyDelStatus = () => dispatchEvent => {
    dispatchEvent(
        {
            type: DELETED,
            delStatus: false
        }
    )
}