import { 
    GET_TASKS,
    GET_TASKS_API,
    DELETE_TASK,
    API_FAIL,
    DELETED,
    ADD_TASK,
    ADDED
 } from '../actions/types';

 import axios from 'axios';

 import { NativeModules } from 'react-native'

 import { call, put, takeLatest, all } from 'redux-saga/effects';

 var ip = require('../../dev/configs/keys').machineIP;

// watcher saga: watches for actions dispatched to the store, starts worker saga
function* getWatcherSaga(){
    //takeLatest automatically cancels any previous saga task started previous if it's still running.        
    
    yield takeLatest(GET_TASKS_API, workerFetchTasks)
}

// deleteWatcher Saga listens 
function* deleteWatcherSaga(){    

    yield takeLatest(DELETE_TASK, workerDeleteTask)
}

function* addWatcherSaga(){
        
    yield takeLatest(ADD_TASK, workerAddTask) 
}

// Fetch all tasks
//export for testing
export const fetchTasks = () => axios.get(ip + ':3000/api/task')
                                    .then(response => response)
                                    
// Worker Saga for making api call when dispatched call was listened by getWatcherSaga
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

export const fetchDelTask = (id) => axios.delete(ip + ':3000/api/task/' + id)
                                        .then(response => response)

// Worker Saga for making api call when dispatching call was listened by deleteWatcherSaga
// exporting for testing                                        
export function* workerDeleteTask(action){    
    try {                
        const response = yield call(fetchDelTask, action.id);

        if (response) {
            var delStatus = true
        }else{
            var delStatus = false
        }

        yield put({ type: DELETED, delStatus})        
    } catch (err) {
        yield put({type: API_FAIL, err})
    }
    
}

export const fetchAddTask = (task) => axios.post(ip + ':3000/api/task/', task)
                                            .then(response => response)

// Worker Saga for making api call when dispatching call was listened by addWatcherSaga
// exporting for testing
export function* workerAddTask(action){
    try {
        const response = yield call(fetchAddTask, action.task);

        if (response) {        
            var addStatus = true
        }else{
            var addStatus = false
        }

        // Create a dummy task using the Native Modules      
        const couchdoc = yield NativeModules.CouchModule.createDocument("testdoc");  

        yield put({ type: ADDED, addStatus })
    } catch (err) {
        yield put({ type: API_FAIL, err })
    }
}


 /* saga debugging */
function* TestSaga(){
    console.log('Redux-Saga is working !');    
}

export default function* rootSaga(){
    yield all(
        [
            TestSaga(),
            getWatcherSaga(), 
            deleteWatcherSaga(),
            addWatcherSaga()       
        ]
    )   
}