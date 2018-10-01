// Use Enzyme  along with jest 

import "react-native"
import React from "react";
import { shallow } from "enzyme";

import store from '../../store';

import EditTaskScreen from '../../screens/EditTaskScreen';

describe('>>> Edit Task Screen', () => {
    it('+++ Should Mount the Edit Task Screen with props data', () => {
        const props = {
            navigation: {
                getParam() {
                    return (
                        {
                            "status":true,
                            "_id":"5b963c959cf78a22a43c0ff2",
                            "title":"Dummy Task",
                            "description":"This Task is a dummy",
                            "end_date":"2018-09-21T00:00:00.000Z",
                            "start_date":"2018-09-13T00:00:00.000Z",
                            "__v":0
                        }
                    )
                }
            },
            store: store
        }

        const wrapper = shallow(<EditTaskScreen {...props} />)
        expect(wrapper).toMatchSnapshot()
    })
})

