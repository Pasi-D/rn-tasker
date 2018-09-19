import React, { Component } from 'react';
import { Text, View } from 'react-native';

import appStyles from './src/styles/app';

import { createStackNavigator } from "react-navigation";

import { Provider } from "react-redux";

import store from './src/store';

import TaskListScreen from './src/screens/TaskListScreen';

const RootStack = createStackNavigator(
  {
    Home: TaskListScreen
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
