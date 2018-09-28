import {
    GET_TASK,    
    GET_TASKS_API,
    DELETE_TASK,
    DELETED,
    ADD_TASK,
    ADDED
} from './types'

//GET_TASKS
export const getTasks = () => dispatchEvent => {
    dispatchEvent(
        {
            type: GET_TASKS_API
        }
    )
}

// To delete a task 
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

// To add a task
export const addTask = (task) => dispatchEvent => {
    dispatchEvent(
        {
            type: ADD_TASK,
            task
        }
    )
}

// To make the added on redux store to make false
export const falsifyAddStatus = () => dispatchEvent => {
    dispatchEvent(
        {
            type: ADDED,
            addStatus: false
        }
    )
}