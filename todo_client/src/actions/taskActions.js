import axios from 'axios';

import {
    GET_TASK,    
    GET_TASKS_API,
    DELETE_TASK
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
    console.log(id + 'delete task parsed to in actions');
    
    dispatchEvent(
        {
            type: DELETE_TASK,
            id
        }
    )
}