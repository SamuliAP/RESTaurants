import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sessionActionCreators } from '../store/actions'

import Header from './header/Header'
import Footer from './footer/Footer'
import RestaurantsListContainer from './restaurants/restaurantsList/RestaurantsListContainer'

class App extends Component {

  state = {
    view: 'restaurants'
  }

  // fetch session to assert authentication
  componentWillMount() {
    this.props.actions.fetchSession()
  }

  toProfilePage = () => this.setState({ view: 'profile' })
  logout = () => this.props.actions.deleteSession()

  render() {
    return (
      <div className="app">
        <Header auth={this.props.authenticated} toProfilePage={this.navigate} logout={this.logout} />
        <div className="content">
          {this.state.view === "restaurants" &&
            <RestaurantsListContainer />
          }
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.sessionReducer })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(sessionActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);