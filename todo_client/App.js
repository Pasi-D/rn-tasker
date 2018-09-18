import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import axios from "axios";

import appStyles from './src/styles/app';

var ip = require('./dev/configs/keys').machineIP

export default class App extends React.Component {
  state = {
    tasks: []
  }

  componentDidMount(){
    axios.get(ip + ':3000/api/task')
        .then(res => {
          console.log('axios call returned a response');
          const tasks = res.data;
          this.setState({tasks: tasks})
        }).catch(err => console.log('error caught : ' + err));
  }

  render() {
    console.log(this.state.tasks);    
    return (            
      <View style={appStyles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text>{(this.state.tasks !== []) ? 'tasks are available' : 'tasks are empty'}</Text>
      </View>
    );
  }
}
