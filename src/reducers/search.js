import * as type from './../constants/ActionTypes';

var initialState = '';


var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SEARCH_TABLE:
            return action.keyword;
        default:
            return state;
    }
}

export default myReducer;