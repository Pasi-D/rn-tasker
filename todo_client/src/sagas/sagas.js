import { 
    GET_TASKS,
    GET_TASKS_API,
    DELETE_TASK,
    API_FAIL
 } from '../actions/types';

 import axios from "axios";

 import { call, put, takeLatest, all } from "redux-saga/effects";

 var ip = require('../../dev/configs/keys').machineIP

 // watcher saga: watches for actions dispatched to the store, starts worker saga
 function* watcherSaga(){
    //takeLatest automatically cancels any previous saga task started previous if it's still running.    
    console.log('listening to dispatch calls');
    
    yield takeLatest(GET_TASKS_API, workerFetchTasks)
 }

 // deleteWatcher Saga listens 
 function* deleteWatcherSaga(){
    console.log('Listening to dispatch calls of delete type');

    yield takeLatest(DELETE_TASK, workerDeleteTask(id))
 }

 /* saga debugging */
function* TestSaga(){
    console.log('Redux-Saga is working !');    
}

// Fetch all tasks
//export for testing
export const fetchTasks = () => axios.get(ip + ':3000/api/task')
                                    .then(response => response)

// Worker Saga for making api call when dispatched call was listened by watcherSaga
// exporting for testing
export function* workerFetchTasks(){
    try {

        const response = yield call(fetchTasks);
        const payload = response.data;            

        // dispatch a success: GET_TASKS action to the store with the fetched tasks
        yield put({type: GET_TASKS, payload})
    } catch (err) {
        yield put({type: API_FAIL, err})
    }
}

// Worker saga to make api call to delete when dispatch call of delete is listened
// Exporting for testing
export function* workerDeleteTask(id){
    console.log(id + ' was passed to delete');
    
}


export default function* rootSaga(){
    yield all(
        [
            TestSaga(),
            watcherSaga(), 
            //deleteWatcherSaga()       
        ]
    )   
}