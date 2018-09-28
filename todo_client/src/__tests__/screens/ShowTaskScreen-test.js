// Use Enzyme along with Jest to Test snapshots 

import "react-native"
import React from "react";
import { shallow } from "enzyme";

import store from '../../store';

import ShowTaskScreen from '../../screens/ShowTaskScreen';

describe('>>> Show Task Screen ', () => {
    it('+++ Should Mount Show Task Screen', () => {
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
        
        const wrapper = shallow(<ShowTaskScreen {...props} />)
        expect(wrapper).toMatchSnapshot()

    })
})
