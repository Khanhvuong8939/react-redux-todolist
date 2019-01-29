import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import editTaskItem from './editTaskItem';
import filter from './filter';
import search from './search';
import sort from './sort';

const myReducer = combineReducers({
    tasks,
    isDisplayForm,
    editTaskItem,
    filter,
    search,
    sort
});

export default myReducer;