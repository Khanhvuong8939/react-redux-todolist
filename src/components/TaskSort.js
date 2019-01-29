import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as action from './../actions/index';

class TaskSort extends Component {

    onSort = (by, value) => {
        let sort = { by, value }
        this.props.onSort(sort)
    }

    render() {
        let { sort } = this.props;
        return (
            <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                <div className='dropdown'>
                    <button className='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>
                        Sort &nbsp;
                        <span className='fa fa-sort'></span>
                    </button>
                    <ul className='dropdown-menu'>
                        <li onClick={() => this.onSort('name', 1)} className={'pointer'} ><button><i className='fa fa-sort-alpha-asc'></i>From A-Z </button>{sort.by === 'name' && sort.value === 1 ? <i className="fa fa-check mt-5"></i> : ''}</li>
                        <li onClick={() => this.onSort('name', -1)} className={'pointer'} ><button><i className='fa fa-sort-alpha-asc'></i>From Z-A </button>{sort.by === 'name' && sort.value === -1 ? <i className="fa fa-check mt-5"></i> : ''}</li>
                        <li onClick={() => this.onSort('status', 1)} className={'pointer'} ><button>Status: Active </button>{sort.by === 'status' && sort.value === 1 ? <i className="fa fa-check mt-5"></i> : ''}</li>
                        <li onClick={() => this.onSort('status', -1)} className={'pointer'} ><button>Status: Hidden </button>{sort.by === 'status' && sort.value === -1 ? <i className="fa fa-check mt-5"></i> : ''}</li>
                    </ul>
                </div>
            </div>
        )
    }
}

var mapStateToProps = state => { return { sort: state.sort } }

var mapDispatchToProp = (dispatch, props) => {
    return {
        onSort: sort => { dispatch(action.sortTable(sort)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(TaskSort);