import * as type from './../constants/ActionTypes';

var initialState = {
    name: '',
    status: -1
}
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FILTER_TABLE:
            return action.filter;
        default: return state;

    }

}

export default myReducer;