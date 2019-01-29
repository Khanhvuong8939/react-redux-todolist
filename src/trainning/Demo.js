import { createStore } from 'redux';

var initialState = {
    status: false,
    sort: {
        by: 'name',
        value: 1
    }
}

var myReducer = (state = initialState, action)=> {
    switch (action.type){
        case 'SORT_PRICE': 
            return {
                status: state.status,
                sort: {
                    by: action.sort.by,
                    value: action.sort.value,
                }
            }            
        default: return state;
    }   
}

const store = createStore(myReducer);

var sortAction = {
    type: 'SORT_PRICE',
    sort: {
        by: 'price',
        value: -1
    }
}

console.log('default: ',store.getState());
store.dispatch(sortAction)
console.log('SORT_PRICE: ', store.getState());
