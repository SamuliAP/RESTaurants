import React, { Component } from 'react'
import { connect } from 'react-redux'

import { FETCH_USERS } from './store/actionTypes'

class App extends Component {
  
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    console.log(this.props.users)
    return (
      <div>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.fetching,
  users: state.users,
  error: state.error
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch({ type: FETCH_USERS })
})

export default connect(mapStateToProps, mapDispatchToProps)(App);