import * as type from './../constants/ActionTypes'

var initialState = {
    id: '',
    name: '',
    status: false
}
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.EDIT_TASK:
            return {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status,
            } ;
        default:
            return state;
    }
}

export default myReducer;