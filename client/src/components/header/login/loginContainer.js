import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sessionActionCreators } from '../../../store/actions'

import ButtonWithUserDialog from '../../common/ButtonWithUserDialog'

export class LoginContainer extends Component {

  createSession = (params) => this.props.actions.createSession({
    headers: {
      authorization: 'Basic ' + btoa(params.email + ':' + params.password)
    }
  })
  

  render() {
    const props = {
      submit: this.createSession,
      openButtonName: "Login",
      dialogSubmitName: "Login",
      className: 'header-content',
      buttonClassName: 'header-content',
      dialogErrors: this.props.errors,
      dialogLoading: this.props.fetching
    }
    return <ButtonWithUserDialog {...props} />
  }
}

const mapStateToProps = state => ({ ...state.sessionReducer })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(sessionActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);