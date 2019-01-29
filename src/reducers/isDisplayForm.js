import * as Types from './../constants/ActionTypes';

var initialState = false;

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.TOOGLE_FORM:
            state = !state;
            return state;
        case Types.OPEN_FORM:
            state = true;
            return state;
        case Types.CLOSE_FORM:
            state = false;
            return state;
        default: return state;
    }

}

export default myReducer;