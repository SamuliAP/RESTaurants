import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sessionActionCreators } from '../store/actions'

import Header from './header/Header'
import Footer from './footer/Footer'
import RestaurantsView from './views/RestaurantsView'
import ProfileView from './views/ProfileView'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      view: 'restaurants'
    }
  }

  // fetch session to assert authentication
  componentWillMount() {
    this.props.actions.fetchSession()
  }

  toProfilePage = () => this.setState({ view: 'profile' })
  toRestaurantsPage = () => this.setState({ view: 'restaurants' })
  logout = () => this.props.actions.deleteSession()

  render() {
    return (
      <div className="app">
        <Header 
          auth={this.props.authenticated}
          fetching={this.props.fetching}
          toProfilePage={this.toProfilePage} 
          toRestaurantsPage={this.toRestaurantsPage} 
          logout={this.logout} 
        />
        <div className="content">
          {this.state.view === "restaurants" && this.props.authenticated && 
            <RestaurantsView user={this.props.user}/>
          }
          {this.state.view === "profile" && this.props.authenticated && 
            <ProfileView user={this.props.user} logout={this.logout} />
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