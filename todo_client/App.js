/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import { createStackNavigator } from "react-navigation";

import { Provider } from "react-redux";

import store from './src/store';

import TaskListScreen from './src/screens/TaskListScreen';
import ShowTaskScreen from './src/screens/ShowTaskScreen';
import EditTaskScreen from './src/screens/EditTaskScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const RootStack = createStackNavigator(
  {
    Home: TaskListScreen,
    Show: ShowTaskScreen,
    Edit: EditTaskScreen,
    Add: AddTaskScreen
  },
  {
    initialRouteName: 'Home',
  }
)
export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider> 
    );
  }
}