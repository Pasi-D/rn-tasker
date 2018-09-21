import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//rootReducer
import rootReducers from './reducers';

//rootSaga
import rootSaga from './sagas/sagas'

import createSagaMiddleware from 'redux-saga'

//redux-logger
import { createLogger } from "redux-logger";
const logger = createLogger({
    
})

//create saga middleare
const sagaMiddleware = createSagaMiddleware();

const middleware =  [thunk, sagaMiddleware, logger]

const initialState  = {}

const store = createStore(
    rootReducers,
    initialState,
    compose(
        applyMiddleware(...middleware)
    )
)

/* run the rootSagas file here*/
sagaMiddleware.run(rootSaga);

export default store;