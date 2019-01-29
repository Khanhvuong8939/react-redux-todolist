import React, { Component } from 'react'
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as action from './../actions/index';

class TaskList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            status: -1
        }
    }


    onChange = (event) => {
        let filterName = event.target.name === 'name' ? event.target.value : this.state.name;
        console.log(event.target.value)
        let filterStatus = event.target.name === 'status' ? parseInt(event.target.value) : this.state.status;
        this.setState({
            name: filterName,
            status: filterStatus
        })
        this.props.onFilter({ name: filterName, status: filterStatus });
    }

    render() {
        let { tasks, filter, search, sort } = this.props;
        console.log(sort)
        let elmTasks = '';
        if (filter.name !== '') {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) > -1;
            })
        }
        if (filter.status !== -1) {
            tasks = tasks.filter((task) => {
                return task.status === (filter.status === 1 ? true : false)
            })
        }
        if (search !== '') {
            tasks = tasks.filter(task => {
                return task.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
            })
        }
        if (sort.by === 'name') {
            tasks.sort((a, b) => {
                console.log('here')
                if (a.name.toLowerCase() > b.name.toLowerCase()) return sort.value;
                else if (a.name.toLowerCase() < b.name.toLowerCase()) return -sort.value
                else return 0
            })
            console.log(tasks)
        } else {
            console.log('another here')
            tasks.sort((a, b) => {
                if (a.status > b.status) return -sort.value;
                else if (a.status < b.status) return sort.value;
                else return 0
            })
        }

        if (tasks) {
            elmTasks = tasks.map((task, index) => {
                return <TaskItem
                    key={task.id}
                    task={task}
                    index={index} />
            })
        }
        return (
            <div className='row form-group'>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <table className='table table-bordered table-hover'>
                        <thead>
                            <tr>
                                <th className='text-center'>No</th>
                                <th className='text-center'>Name</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input type='text' name='name' id='name' className='form-control' value={filter.name} onChange={this.onChange} />
                                </td>
                                <td>
                                    <select name='status' id='status' value={filter.status} onChange={this.onChange} className='form-control'>
                                        <option value={-1}>All</option>
                                        <option value={0}>Hidden</option>
                                        <option value={1}>Active</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {elmTasks}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

var mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filter: state.filter,
        search: state.search,
        sort: state.sort
    }
}
var mapDispatchToProps = (dispatch, props) => {
    return {
        onFilter: (filter) => { dispatch(action.filterTable(filter)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);