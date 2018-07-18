import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { restaurantsActionCreators } from '../../store/actions'

import CreateRestaurantForm from './CreateRestaurantForm'
export class CreateRestaurantContainer extends Component {

  createRestaurant = body => this.props.actions.createRestaurant({ body })
  render() {
    return (
      <CreateRestaurantForm fetching={this.props.fetching} errors={this.props.errors} createRestaurant={this.createRestaurant}/>
    )
  }
}

const mapStateToProps = state => ({ ...state.restaurantsReducer })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(restaurantsActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateRestaurantContainer);