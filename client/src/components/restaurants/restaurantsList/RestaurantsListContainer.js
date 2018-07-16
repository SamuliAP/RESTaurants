import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { restaurantsActionCreators } from '../../../store/actions'

import RestaurantsList from './RestaurantsList'

export class RestaurantsListContainer extends Component {

  componentWillMount() {
    this.props.actions.fetchRestaurants()
  }
  render() {
    console.log(this.props)
    return <RestaurantsList />
  }
}

const mapStateToProps = state => ({ ...state.restaurantsReducer })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(restaurantsActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsListContainer);