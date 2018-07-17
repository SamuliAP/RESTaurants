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

  saveEditName = (body, id) => this.props.actions.updateRestaurantName({body}, id)
  saveEditAddress = (body, id) => this.props.actions.updateRestaurantAddress({body}, id)

  render() {
    return <RestaurantsList 
      saveEditName={this.saveEditName}
      saveEditAddress={this.saveEditAddress}
      deleteRestaurant={this.deleteRestaurant} 
      restaurants={this.props.restaurants} 
      user={this.props.user}
      errors={this.props.updateErrors}
    />
  }
}

const mapStateToProps = state => ({ ...state.restaurantsReducer, user: state.sessionReducer.user })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(restaurantsActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsListContainer);