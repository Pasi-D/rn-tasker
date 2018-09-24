import React,{ Component } from "react";

import { View, StyleSheet, Button } from 'react-native';

import { Header } from 'react-native-elements'

import moment from "moment";

import t from 'tcomb-form-native'; //0.6.17

import axios from "axios";

const Form = t.form.Form;

const Task = t.struct({
    title: t.String,
    description: t.String,  
    start_date: t.Date,
    end_date: t.Date    
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
        }        
    }
}

var ip = require('../../dev/configs/keys').machineIP;

export default class AddTaskScreen extends Component{

    constructor(props){
        super(props);

        this.state ={
            task: {}                        
        }
    }

    handleSubmit = () => {        
        const { title, description, start_date, end_date } = this.state.task

        // make an axios call --> switch this to saga later
        axios.post(ip + ':3000/api/task/', { title, description, start_date, end_date })
                .then(result => {
                    this.props.navigation.replace({
                        routeName: 'Home'            
                    })
                })
    }

    onChange = (value) => {
        this.setState({task: value})

        console.log('onchange state task ' + JSON.stringify(this.state.task));
        
    }


    render(){
        return(
            <View>
                <Header 
                    centerComponent={{ text: 'Add Task', style: { color: '#fff' } }}
                />
                <View style={styles.container}>
                    <Form 
                        ref={c => this._form = c} 
                        type={Task}
                        options={options}
                        onChange={this.onChange}
                        value={this.state.task}
                    />
                    <Button 
                        title='Create'
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