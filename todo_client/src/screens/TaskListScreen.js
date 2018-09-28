import React,{ Component } from "react";
import { ActivityIndicator, View, Text, ToastAndroid } from "react-native";

import { List, ListItem, Header } from 'react-native-elements';

import { connect } from "react-redux";

import { getTasks } from "../actions/taskActions";

import { PropTypes } from "prop-types";

class TaskListScreen extends Component{

    constructor(props) {
        super(props);   
        this._listItemPress = this._listItemPress.bind(this) 
    }

    _keyExtractor = (item, index) => item._id;

    _listItemPress = (item) =>{
        //navigate to task show screen                
        this.props.navigation.push('Show', {
            task: {...item}
        })   
    }

    _addTaskIconPress = () => {
        //navigate to addTask screen
        this.props.navigation.push('Add')
    }

    renderTasks(){
        const resTasks = this.props.tasks;
        const tasks = resTasks.tasks;
        const loading = this.props.loading;

        console.log('tasks : ' + JSON.stringify(tasks));

        //convert the restasks in JSON.stringify to an array
        if(this.props.errors){
            return(
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center' 
                }}>
                    <Text>Something is wrong with the server connectivity</Text>
                </View>
            )    
        }else if (loading) {
            //Load if no tasks are received yet
            return(
                <View style={{flex:1, padding: 40}}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }else{
            return(
                <View>
                    <Header                        
                        centerComponent={{ text: 'Tasks Lists', style: { color: '#fff' } }}
                        rightComponent={{ icon: 'add', 
                                          color: '#fff',
                                          onPress: () => this._addTaskIconPress()  
                                        }}                        
                    />
                    <List style={{marginTop: 20}}>
                        {
                            tasks.map((item) => (
                                <ListItem
                                    onPress={() => this._listItemPress(item)}
                                    key={item._id}
                                    title={item.title}
                                    subtitle={
                                                (item.status) ? 'Completed' : 'Incomplete'
                                             }
                                    />
                            ))
                        }
                    </List>
                </View>
            )
        }
    }    
    componentWillMount(){
        this.props.getTasks();                       
    }

    componentDidMount(){
        this.props.getTasks();                       
        if (this.props.deleted) {
            console.log('This is supposed to trigger on deletion');
            
            ToastAndroid.show('Task Was Deleted', ToastAndroid.LONG);
        }else if(this.props.added){
            console.log('This is supposed to trigger on addition');

            ToastAndroid('Task was added', ToastAndroid.LONG);
        }
    }

    render(){                
        return(
            this.renderTasks()
        )
    }
}

TaskListScreen.propTypes = {
    getTasks: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    tasks: state.tasks,
    errors: state.tasks.errors,
    loading: state.tasks.loading,
    deleted: state.tasks.deleted,
    added: state.tasks.added
})

export default connect(mapStateToProps, { getTasks })(TaskListScreen);