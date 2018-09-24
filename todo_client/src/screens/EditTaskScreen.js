import React, { Component } from "react";

import { View, StyleSheet, Button } from 'react-native';

import { Header } from 'react-native-elements'

import moment from "moment";

import axios from "axios";

import t from 'tcomb-form-native'; //0.6.17

const Form = t.form.Form;

const Task = t.struct({
    title: t.String,
    description: t.String,  
    start_date: t.Date,
    end_date: t.Date,
    status: t.Boolean
});

const options = {
    fields: {        
        start_date: {
            label: 'Start Date',
            mode: 'date',
            config: {
                format: (date) => moment(date).format('YYYY-MM-DD'),
            },            
        },
        end_date: {
            label: 'End Date',
            mode: 'date',
            config: {
                format: (date) => moment(date).format('YYYY-MM-DD'),
            },        
        },
        status: {
            label: 'Completed ?'
        }
    }
}

var ip = require('../../dev/configs/keys').machineIP;

export default class EditTaskScreen extends Component{    

    constructor(props){
        super(props);        
        var task = this.props.navigation.getParam('task', {"status":true,"_id":"5b963c959cf78a22a43c0ff2","title":"Task not found","description":"Something went wrong","end_date":(new Date("2018-09-21T00:00:00.000Z")),"start_date":(new Date("2018-09-13T00:00:00.000Z")),"__v":0});        
        var newTask = {...task, 
                        "start_date": new Date(task.start_date),
                        "end_date": new Date(task.end_date)
                      }     
        this.state = {
            task: newTask
        }
        

    }

    handleSubmit = () => {
        const { _id, title, description, start_date, end_date, status } = {...this.state.task, 
                                                                        start_date: this.state.task.start_date.toUTCString(),
                                                                        end_date: this.state.task.end_date.toUTCString()                                                                    
                                                                    }
        
        // Do an axios call here --> move this to Sagas
        axios.put(ip + ':3000/api/task/' + _id, 
                    { title, description, start_date, end_date, status })
                    .then(result => {
                        this.props.navigation.replace({
                            routeName: 'Home'            
                        })
                    })
    }

    onChange = (value) => {        
        this.setState({task: value})        
    }

    render(){
        return(
            <View>
                <Header 
                    centerComponent={{ text: 'Task Detail', style: { color: '#fff' } }}
                />
                <View style={styles.container}>
                    <Form          
                        ref={c => this._form = c}                
                        type={Task}
                        options={options}
                        value={this.state.task}
                        onChange={this.onChange}
                    />
                    <Button 
                        title='Change'
                        onPress={this.handleSubmit}
                    />
                </View>
            </View>            
        )
    }
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 50,
      padding: 20,
      backgroundColor: '#ffffff',
    },
});