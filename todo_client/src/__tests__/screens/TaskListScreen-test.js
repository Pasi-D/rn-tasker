// Use Enzyme along with Jest to Test 

import "react-native"
import React from "react";
import { shallow } from "enzyme";

import { GET_TASKS,
         API_FAIL,
         FLUSH 
       } from "../../actions/types";

import store from '../../store';

import TaskListScreen from '../../screens/TaskListScreen';

const taskdata = [ { 
                        status: true,
                        _id: '5ba9d4e21a5bcb2c5e6eaf3e',
                        title: 'Task Two',
                        description: 'Task Two',
                        start_date: '2018-09-18T18:30:00.000Z',
                        end_date: '2018-09-19T18:30:00.000Z',
                        __v: 0 },
                    { 
                        status: false,
                        _id: '5ba9d5711a5bcb2c5e6eaf3f',
                        title: 'Task Three',
                        description: 'Task Three',
                        start_date: '2018-09-12T18:30:00.000Z',
                        end_date: '2018-09-19T18:30:00.000Z',
                        __v: 0 } 
                 ]

                 

const getTasks = () => ({
    type: GET_TASKS,
    payload: taskdata
})

const getErrors = () => ({
    type: API_FAIL,
    err: {
        someError: 'Error on API call'
    } 
})

const flushAll = () => ({
    type: FLUSH
})


describe('>>> Task List Screen ', () => {    
    
    // beforeEach dispatch the store to flush all data in store
    beforeEach(() => {
        store.dispatch(flushAll())
    })
    
    it('+++ Should mount TaskList with dummy API data', () => {
        store.dispatch(getTasks())
        const wrapper = shallow(
            <TaskListScreen store={store}/>
        ).dive();
        expect(wrapper).toMatchSnapshot();
    })
    
    it('+++ Should mount TaskList with error', () => {
        store.dispatch(getErrors())
        const wrapper = shallow(
            <TaskListScreen store={store}/>
        ).dive();
    })

    
})