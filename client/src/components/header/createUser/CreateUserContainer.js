import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { usersActionCreators } from '../../../store/actions'

import ButtonWithUserDialog from '../../common/ButtonWithUserDialog'

export class CreateUserContainer extends Component { 

  createUser = (params) => this.props.actions.createUser({
    body: { email: params.email, password: params.password }
  })

  render() {
    const props = {
      submit: this.createUser,
      openButtonName: "Create User",
      dialogSubmitName: "Create",
      className: 'header-content',
      buttonClassName: 'header-content'
    }
    return <ButtonWithUserDialog {...props} />
  }
}

const mapStateToProps = state => ({ ...state.usersReducer })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(usersActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserContainer);