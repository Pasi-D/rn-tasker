// Use Enzyme along with Jest to Test 

import "react-native"
import React from "react";
import { shallow } from "enzyme";

import store from '../../store';

import TaskListScreen from '../../screens/TaskListScreen';

describe('>>> Task List Screen ', () => {
    it('+++ Should mount TaskList', () => {
        const wrapper = shallow(
            <TaskListScreen store={store}/>
        ).dive();
        expect(wrapper).toMatchSnapshot();
    })
})