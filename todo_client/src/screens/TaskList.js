import React,{ Component } from "react";
import { ActivityIndicator, View, FlatList, Text } from "react-native";
import { List, ListItem } from 'react-native-elements'

import { connect } from "react-redux";

import { getTasks } from "../actions/taskActions";

import { PropTypes } from "prop-types";

class TaskList extends Component{
    constructor(props) {
        super(props);    
    }
    
    _keyExtractor = (item, index) => item._id;

    renderTasks(){
        const resTasks = this.props.tasks;
        const tasks = resTasks.tasks;
        const loading = this.props.loading;
        
        console.log('tasks : ' + JSON.stringify(tasks));
        ``
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
                <List>
                    {
                        tasks.map((item) => (
                            <ListItem
                                key={item._id}
                                title={item.title}
                                />
                        ))
                    }
                </List>
            )
        }
    }

    componentDidMount(){
        this.props.getTasks();        
    }

    render(){
        return(
            this.renderTasks()
        )
    }
}

TaskList.propTypes = {
    getTasks: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    tasks: state.tasks,
    errors: state.tasks.errors,
    loading: state.tasks.loading
})

export default connect(mapStateToProps, { getTasks })(TaskList);

