// Use Enzyme  along with jest 

import "react-native"
import React from "react";
import { shallow } from "enzyme";

import store from '../../store';

import AddTaskScreen from '../../screens/AddTaskScreen';

describe('>>> Add Task Scren', () => {
    it('+++ Should mount correctly', () => {
        const wrapper = shallow(<AddTaskScreen store={store} />);
        expect(wrapper).toMatchSnapshot();
    })
})