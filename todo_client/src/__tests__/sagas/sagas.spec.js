// Test Script for Saga Testing

import {
    GET_TASKS,
} from '../../actions/types';

var ip = require('../../../dev/configs/keys').machineIP;

import { put, call } from "redux-saga/effects";
import { workerFetchTasks, fetchTasks } from "../../sagas/sagas";

describe('>>>Testing Saga ---- workerFetchTasks', () => {    
    
    const generator = workerFetchTasks();

    let next;
    it('+++ must call fetchTasks', () => {           
        next = generator.next();
        expect(next.value).toEqual(call(fetchTasks))
    })

    it('+++ successfully mocks an actual network request', async () => {        

        let payload = {
            "_id": "5b963c959cf78a22a43c0ff2",
            "title": "Task two",
            "description": "Second Task",
            "end_date": "2018-09-21T00:00:00.000Z",
            "__v": 0,
            "status": true,
            "start_date": "2018-09-13T00:00:00.000Z"
        }

        let mockResult = { status: 201, data: payload }

        /* const tasks = await generator.next().value(); */
        next = await generator.next(mockResult);
        
        expect(next.value).toEqual(put({type: GET_TASKS, payload}))

    }) 
})


