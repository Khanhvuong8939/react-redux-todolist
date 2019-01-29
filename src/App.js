import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import uuidv4 from 'uuid/v4';
import * as actions from './actions/index';

import { connect } from 'react-redux';

//import './trainning/Demo';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      sort: {
        by: 'name',
        value: 1
      }
    }
  }

  onGenerateData = () => {
    let tasks = [
      {
        id: uuidv4(),
        name: 'React Js',
        status: true
      },
      {
        id: uuidv4(),
        name: 'Venky',
        status: false
      },
      {
        id: uuidv4(),
        name: 'Awesome',
        status: false
      },
      {
        id: uuidv4(),
        name: 'Loveeee',
        status: true
      },
      {
        id: uuidv4(),
        name: 'huhu',
        status: true
      }
    ];
    this.setState({
      tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onToogleForm = () => {
    if (this.props.editTaskItem.id !== '') {
      this.props.onOpenForm();
      this.props.editTask({ id: '', name: '', status: false });
    } else {
      this.props.onToogleForm();
    }
  }

  onSubmit = (formData) => {
    var task = {
      id: formData.id,
      name: formData.name,
      status: formData.status
    }

    if (task.id === '') {
      task.id = uuidv4();
      let oldTask = JSON.parse(localStorage.getItem('tasks'));
      let newTask = [...oldTask, task];
      localStorage.setItem('tasks', JSON.stringify(newTask));
      this.state.tasks.push(task);
      this.setState({
        tasks: this.state.tasks
      })
    } else {
      let index = this.findIndexById(task.id);
      if (index !== -1) {
        let tasks = this.state.tasks;
        tasks[index] = task;
        console.log(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }
  }


  onRemoveItem = (id) => {
    let index = this.findIndexById(id);
    let { tasks } = this.state;
    tasks.splice(index, 1)
    this.setState({ tasks });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onEditItem = (id) => {
    let index = this.findIndexById(id);
    let { tasks } = this.state;
    this.setState({ isEditItem: tasks[index] })
    this.onShowEditForm();
  }

  onFilter = (filterName, filterStatus) => {
    this.setState({
      filter: {
        filterName,
        filterStatus
      }
    })
  }

  onSearch = (keyword) => {
    this.setState({ keyword })
  }

  onSort = (name, value) => {
    console.log(name, '-', value)
    this.setState({
      sort: {
        by: name,
        value
      }
    })
  }


  render() {
    let { isDisplayForm } = this.props;
    // if (keyword !== '') {
    //   tasks = tasks.filter((task) => {
    //     return task.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1
    //   })
    // }
    // if (filter) {
    //   if (filter.filterName !== '') {
    //     tasks = tasks.filter((task) => {
    //       return task.name.toLowerCase().indexOf(filter.filterName.toLowerCase()) > -1
    //     })
    //   }

    //   tasks = tasks.filter((tasks) => {
    //     if (filter.filterStatus === -1 || filter.filterStatus === '-1') {
    //       return tasks;
    //     }
    //     else {
    //       return tasks.status === (filter.filterStatus === 1 || filter.filterStatus === '1'  ? true : false);
    //     }
    //   });

    // }
    // if (sort.by === 'name') {
    //   tasks.sort((a, b) => {
    //     if (a.name > b.name) { return sort.value }
    //     else if (a.name < b.name) { return -sort.value }
    //     else return 0;
    //   })
    // } else {
    //   tasks.sort((a, b) => {
    //     if (a.status > b.status) return -sort.value
    //     else if (a.status < b.status) return sort.value
    //     else return 0
    //   })
    // }

    let elmTaskForm = isDisplayForm === true
      ? <TaskForm /> : '';
    return (
      <div className='container mt-50'>

        <h2 className='text-center'>To Do List</h2>
        <hr />
        <div className='row'>
          <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4'>
            {/* TaskForm */}
            {elmTaskForm}
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <div className='form-group'>
              <div className='row form-group'>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={this.onToogleForm}
                  ><i className='fa fa-plus'></i> Add To Do</button>
                  <button
                    type='button'
                    className='btn btn-danger ml-5'
                    onClick={this.onGenerateData}
                  ><i className='fa fa-clone'></i> Generate Data</button>
                </div>
              </div>
              {/* TaskSearchSort */}
              <TaskControl />

              <TaskList />
            </div>
          </div>
        </div>
        <hr />
      </div>

    );
  }
}

var mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm,
    editTaskItem: state.editTaskItem
  }
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onToogleForm: () => { dispatch(actions.toogleForm()) },
    onOpenForm: () => { dispatch(actions.openForm()) },
    editTask: (task) => { dispatch(actions.editTask(task)) },
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
