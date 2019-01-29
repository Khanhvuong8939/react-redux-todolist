import * as Types from './../constants/ActionTypes';
import uuidv4 from 'uuid/v4'

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var findIndexById = (tasks, id) => {
    let result = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) result = index
    });
    return result;
}


const myReducer = (state = initialState, action) => {
    let index = -1;
    switch (action.type) {
        case Types.LIST_ALL:
            return state;
        case Types.SAVE_TASK:
            var newTask = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status
            }
            if (newTask.id === '') {
                newTask.id = uuidv4();
                state.push(newTask)
            } else {
                index = findIndexById(state, newTask.id);
                state[index] = newTask
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case Types.CHANGE_STATUS_TASK:
            index = findIndexById(state, action.id);
            if (index !== -1) {
                state[index] = {
                    ...state[index],
                    status: !state[index].status
                }
                localStorage.setItem('tasks', JSON.stringify(state));
            }
            return [...state];

        case Types.REMOVE_TASK_ITEM:
            index = findIndexById(state, action.id);
            state.splice(index, 1)
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state]
        default:
            return state;
    }
}


export default myReducer;