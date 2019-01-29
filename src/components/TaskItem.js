import React, { Component } from 'react'
import * as actions from './../actions/index';
import { connect } from 'react-redux';

class TaskItem extends Component {

    onChangeStatus = () => {
        this.props.onChangeStatus(this.props.task.id)
    }

    onRemoveTaskItem = () => {
        this.props.onRemoveTaskItem(this.props.task.id);
    }

    onEditItem = () => {
        this.props.onOpenTaskForm();
        this.props.onEdit(this.props.task)
    }



    render() {
        var { task, index } = this.props
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className='text-center'>
                    <span className={task.status === true ? 'label label-success' : 'label label-danger'} onClick={this.onChangeStatus}>{task.status === true ? 'Active' : 'Hidden'}</span>
                </td>
                <td className='text-center'>
                    <button
                        type='button'
                        className='btn btn-warning'
                        onClick={this.onEditItem}>
                        <i className='fa fa-edit'></i> Edit
                    </button>
                    &nbsp;
                    <button
                        type='button'
                        className='btn btn-danger'
                        onClick={this.onRemoveTaskItem}>
                        <i className='fa fa-trash'></i> Delete
                    </button>
                </td>
            </tr>
        )
    }
}

var mapStateToProps = state => {
    return {}
}

var mapDispatchToProps = (dispatch, props) => {
    return {
        onChangeStatus: (id) => {
            dispatch(actions.changeStatusTask(id));
        },
        onRemoveTaskItem: (id) => {
            dispatch(actions.removeTaskItem(id));
            dispatch(actions.closeForm());
        },
        onOpenTaskForm: () => dispatch(actions.openForm()),
        onEdit: (task) => dispatch(actions.editTask(task))
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);