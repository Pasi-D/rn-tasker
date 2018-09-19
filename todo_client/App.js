import React, { Component } from 'react';
import { Text, View } from 'react-native';

import appStyles from './src/styles/app';

import { Provider } from "react-redux";

import store from './src/store';

import TaskList from './src/screens/TaskList';

export default class App extends Component {
  
  render() {        
    return (            
      <Provider store={store}>
        <TaskList />
      </Provider>
    );
  }
}
