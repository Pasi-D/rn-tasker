import React, { Component } from "react";
import { View } from "react-native";

import { Header, Text, Divider, Button } from "react-native-elements";

import { PropTypes } from "prop-types";

import { connect } from "react-redux";

import Modal from "react-native-modal";

import deleteTask from '../actions/taskActions';

class ShowTaskScreen extends Component{
    state = {
        isDeleteModalVisible: false
    };

    constructor(props) {
        super(props);
    }

    _editButtonPress = (task) => {
        this.props.navigation.push('Edit', {
            task: {...task}
        })
    }

    _toggleDeleteModal = () => {
        this.setState({ 
            isDeleteModalVisible: !this.state.isDeleteModalVisible 
        });
    }

    _confDeleteButton = (id) => {
        this.props.deleteTask(id)
        this._toggleDeleteModal();
    }

    _cancelDeleteButton = () => {
        this._toggleDeleteModal();   
    }


    render(){
        const { navigation } = this.props;
        const task = navigation.getParam('task', {"status":true,"_id":"5b963c959cf78a22a43c0ff2","title":"Task not found","description":"Something went wrong","end_date":"2018-09-21T00:00:00.000Z","start_date":"2018-09-13T00:00:00.000Z","__v":0});
                
        return(
            <View>
                <Header 
                    centerComponent={{ text: 'Task Detail', style: { color: '#fff' } }}
                />
                <Divider style={{ backgroundColor: 'blue' }} />
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 90
                }}>
                    <Text>Task Title : {JSON.stringify(task.title)}</Text>
                    <Text>Task Description : {JSON.stringify(task.description)}</Text>
                    <Text>Start Date: {JSON.stringify(task.start_date)}</Text>
                    <Text>End Date: {JSON.stringify(task.end_date)}</Text>
                </View>
                
                <View style={{marginTop: 70}}>
                    <Button 
                        title='Edit'
                        buttonStyle={{
                            backgroundColor: "rgba(0,255,0,0.3)"
                        }}
                        onPress={() => this._editButtonPress(task)}
                    />
                    <Button
                        title='Delete'
                        buttonStyle={{
                            backgroundColor: "rgba(255,0,0,0.3)"
                        }}
                        onPress={this._toggleDeleteModal}    
                    />
                    <Modal 
                        isVisible={this.state.isDeleteModalVisible}
                        backdropColor="white"
                        backdropOpacity='0.95'
                    >
                        <View style={{ 
                            flex: 1,
                            marginTop: 120
                        }}>
                            <Button
                                title='Confirm'
                                onPress={() => this._confDeleteButton(task._id)}
                                buttonStyle={{
                                    backgroundColor: "rgba(255,0,0,0.3)"
                                }}
                            />
                            <Button 
                                title='Cancel'
                                onPress={() => this._cancelDeleteButton()}
                                buttonStyle={{
                                    backgroundColor: "rgba(0,0,255,0.3)"
                                }}
                            />
                        </View>
                    </Modal>
                </View>                
            </View>
        )
    }

    
}

ShowTaskScreen.propTypes = {
    deleteTask: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    tasks: state.tasks
})

export default connect(mapStateToProps, { deleteTask })(ShowTaskScreen);