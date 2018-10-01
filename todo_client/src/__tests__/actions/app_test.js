import { getTasks, 
         deleteTask, 
         falsifyDelStatus,
         addTask,
         falsifyAddStatus
        } from '../../actions/taskActions'
import {
    GET_TASKS_API,
    DELETE_TASK,
    DELETED,
    ADD_TASK,
    ADDED
} from '../../actions/types'

describe('>>> All actions ', () => {
    it('+++ Should make a dispatch call to get tasks', () => {    
        const dispatch = jest.fn();

        getTasks()(dispatch);

        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0]).toEqual([{
            type: GET_TASKS_API
        }])
    })

    it('+++ Should make a dispatch call to delete a task', () => {
        const dispatch = jest.fn();

        deleteTask("ID1")(dispatch);

        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0]).toEqual([{
            type: DELETE_TASK,
            id: "ID1" 
        }])
    })

    it('+++ should falsify a delete status', () => {
        const dispatch = jest.fn();

        falsifyDelStatus()(dispatch);

        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0]).toEqual([{
            type: DELETED,
            delStatus: false
        }])
    })

    it('+++ Should add a task', () => {
        const dispatch = jest.fn();
 
        const task = { newTask: "Sometask" }

        addTask(task)(dispatch);
        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0]).toEqual([{
            type: ADD_TASK,
            task: task
        }])
    })

    it('+++ Should falsify an addition status', () => {
        const dispatch = jest.fn();

        falsifyAddStatus()(dispatch);

        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0]).toEqual([{
            type: ADDED,
            addStatus: false
        }])
    })
})