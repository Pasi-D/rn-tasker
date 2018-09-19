import axios from 'axios';

import {
    GET_TASK,    
    GET_TASKS_API
} from './types'

//GET_TASKS
export const getTasks = () => dispatchEvent => {
    dispatchEvent(
        {
            type: GET_TASKS_API
        }
    )
}