import * as Types from './../constants/ActionTypes';

export const listAll = () => {
    return {
        type: Types.LIST_ALL
    };
};
export const saveTask = task => {
    return {
        type: Types.SAVE_TASK,
        task
    }
}
export const editTask = task => {
    return {
        type: Types.EDIT_TASK,
        task
    }
}
export const toogleForm = () => {
    return {
        type: Types.TOOGLE_FORM
    }
}
export const openForm = () => {
    return {
        type: Types.OPEN_FORM
    }
}
export const closeForm = () => {
    return {
        type: Types.CLOSE_FORM
    }
}
export const changeStatusTask = id => {
    return {
        type: Types.CHANGE_STATUS_TASK,
        id
    }
}
export const removeTaskItem = id => {
    return { 
        type: Types.REMOVE_TASK_ITEM,
        id
     }
}
export const filterTable = filter => {
    return { 
        type: Types.FILTER_TABLE,
        filter
     }
}
export const searchTable = keyword => {
    return { 
        type: Types.SEARCH_TABLE,
        keyword
     }
}
export const sortTable = sort => {
    return { 
        type: Types.SORT_TABLE,
        sort
     }
}