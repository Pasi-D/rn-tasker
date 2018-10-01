import taskReducer from '../../reducers/taskReducer';

import { 
    GET_TASKS,    
    API_FAIL,
    DELETED,
    ADDED,
    FLUSH,
    SET_STATE
 } from "../../actions/types";

 describe('>>> All Reducers', () => {
    it('+++ Should create a new state', () => {
        const initialState = {};
        const action = { type: SET_STATE, state: { newDummyState: "newDummyState" }}
        const nextState = taskReducer(initialState, action);
        expect(nextState).toEqual({ newDummyState: "newDummyState" })
    }) 

    it('+++ Should create a new but not earlier state', () => {
        const initialState = { newstate: "hello" };
        const action = { type: SET_STATE, state: { newstate2: "world" } };
        const nextState = taskReducer(initialState, action);
        expect(nextState).toEqual({ newstate: "hello", newstate2: "world" });    
    })
    
    it('+++ Should clear all previous states', () => {
         const initialState = { 
            tasks: null,
            task: null,   
            errors: null, 
            loading: true,
            deleted: false,
            added: false
          }
         // set a new dummy state before flushing
         const action = { type: SET_STATE, state: { newDummyState: "newDummyState" }}
         const nextState = taskReducer(initialState, action);

         const flushAction = { type: FLUSH }
         const originalState = taskReducer(nextState, flushAction)

         expect(originalState).toEqual({});
     })

     it('+++ Should be able to set an error message on fail of CTA API', () => {
         const initialState = {}
         const action = { type: API_FAIL, err: "Invalid CTA" }
         const nextState = taskReducer(initialState, action)
         expect(nextState).toEqual({ loading: false, errors: "Invalid CTA" })
     })

     it('+++ Should be able to update the Tasks on Getting tasks', () => {
         const initialState = {}
         const payload = {
            "_id": "5b963c959cf78a22a43c0ff2",
            "title": "Task two",
            "description": "Second Task",
            "end_date": "2018-09-21T00:00:00.000Z",
            "__v": 0,
            "status": true,
            "start_date": "2018-09-13T00:00:00.000Z"
        }
        const action = { type: GET_TASKS, payload }
        const newState = taskReducer(initialState, action)
        expect(newState).toEqual({ loading: false, tasks: payload })
     })

     it('+++ Should be set the deleted notifier to true on deletion', () => {
         const initialState = { deleted: false }
         const action = { type: DELETED, delStatus: true }
         const nextState = taskReducer(initialState, action)
         expect(nextState).toEqual({ loading: false, deleted: true })
     })

     it('+++ Should be set the added notifier to true on addition', () => {
        const initialState = { added: false }
        const action = { type: ADDED, addStatus: true }
        const nextState = taskReducer(initialState, action)
        expect(nextState).toEqual({ loading: false, added: true })
    })
          
 })

