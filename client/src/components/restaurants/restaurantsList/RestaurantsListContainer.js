import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { restaurantsActionCreators } from '../../../store/actions'

import RestaurantsList from './RestaurantsList'

export class RestaurantsListContainer extends Component {

  componentDidMount() {
    this.props.actions.fetchRestaurants()
  }

  deleteRestaurant = id => this.props.actions.deleteRestaurant(id)

  render() {
    return <RestaurantsList 
      deleteRestaurant={this.deleteRestaurant} 
      restaurants={this.props.restaurants} 
      user={this.props.user}
    />
  }
}

const mapStateToProps = state => ({ ...state.restaurantsReducer, user: state.sessionReducer.user })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(restaurantsActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsListContainer);