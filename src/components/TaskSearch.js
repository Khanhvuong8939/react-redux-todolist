import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as action from './../actions/index'

class TaskSearch extends Component {

    constructor(props) {
        super(props)

        this.state = {
            keyword: ''
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword)
    }


    render() {
        return (
            <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                <div className='input-group'>
                    <input name='keyword' value={this.state.keyword} onChange={this.onChange} type='text' className='form-control' placeholder='Search' />
                    <span className='input-group-btn'>
                        <button type='button' className='btn btn-primary form-control btn-form-group' onClick={this.onSearch}><i className='fa fa-search'></i> Search</button>
                    </span>
                </div>
            </div>
        )
    }
}

var mapStateToProps = state => {
    return { keyword: state.search }
};

var mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch: keyword => { dispatch(action.searchTable(keyword)) },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskSearch);