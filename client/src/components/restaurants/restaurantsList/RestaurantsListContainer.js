import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { restaurantsActionCreators } from '../../../store/actions'

import RestaurantsList from './RestaurantsList'

export class RestaurantsListContainer extends Component {

  componentDidMount() {
    this.props.actions.fetchRestaurants()
  }
  render() {
    return <RestaurantsList restaurants={this.props.restaurants} />
  }
}

const mapStateToProps = state => ({ ...state.restaurantsReducer })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(restaurantsActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsListContainer);