import taskReducer from '../../reducers/taskReducer';

import { 
    GET_TASKS,
    GET_TASK,
    API_FAIL,
    DELETED,
    ADDED,
    FLUSH,
    SET_STATE
 } from "../../actions/types";

 describe('>>> All Reducers', () => {
     it('+++ Should clear all previous states', () => {
         const initialState = { 
            tasks: null,
            task: null,   
            errors: null, 
            loading: true,
            deleted: false,
            added: false
          }
         const action = { type: SET_STATE, state: { newDummyState: "newDummyState" }}
         const nextState = taskReducer(initialState, action);

         const flushAction = { type: FLUSH }
         const originalState = taskReducer(nextState, flushAction)

         expect(originalState).toEqual({});
     })

     
 })
