import React, { Component } from 'react';
import { Text, View } from 'react-native';

import appStyles from './src/styles/app';

import { createStackNavigator } from "react-navigation";

import { Provider } from "react-redux";

import store from './src/store';

import TaskListScreen from './src/screens/TaskListScreen';
import ShowTaskScreen from './src/screens/ShowTaskScreen';
import EditTaskScreen from './src/screens/EditTaskScreen';

const RootStack = createStackNavigator(
  {
    Home: TaskListScreen,
    Show: ShowTaskScreen,
    Edit: EditTaskScreen
  },
  {
    initialRouteName: 'Home',
  }
);
export default class App extends Component {
  
  render() {        
    return (            
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
