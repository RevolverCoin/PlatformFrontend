import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'

import BaseFormPage from '../../../components/guest/baseFormPage'

import { resetPasswordAction, clearForgotPasswordStatusAction } from '../../../actions/actions'
import { passwordRegex } from '../../../utils/misc'

const SuccessMessage = styled.p`
  color: #3b9068;
`
const FailureMessage = styled.p`
  color: #c9341d;
`

class ResetPassword extends BaseFormPage {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      passwordConfirm: '',
      errorMsg: '',
      code: ''
    }

    this.onResetClick = this.onResetClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search)
    const code = urlParams.get('code')

    this.setState({ code })


    this.props.clearResetPasswordStatus()
  }

  checkInputsForErrors() {
    if (this.state.password !== this.state.passwordConfirm) return 'Passwords do not match'
    if (!passwordRegex.test(this.state.password))
      return 'Wrong password: password should be at list of 6 chars where lowercase, uppercase and digit are required'

    return null
  }

  onResetClick(e) {
    e.preventDefault()
    this.props.clearResetPasswordStatus()
    this.setState({ errorMsg: null })

    const error = this.checkInputsForErrors()

    if (!error)
      this.props.resetPassword(this.state.password, this.state.code)
    else 
        this.setState({ errorMsg: error })
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    
    // remove errors on edit
    this.props.clearResetPasswordStatus()
    this.setState({ errorMsg: null })
  }

  getCaption() {
    return 'Reset Password'
  }

  renderPage() {
    const resetSuccessfully = this.props.status && this.props.status === 'success'

    return (
      <Form>
        {resetSuccessfully ? null : (
          <div>
            <Input
              label="Password"
              type="password"
              name="password"
              onChange={this.handleInputChange}
              floatingLabel
              required
            />
            <Input
              label="Confirm password"
              type="password"
              name="passwordConfirm"
              onChange={this.handleInputChange}
              floatingLabel
              required
            />

            <Button
              color="primary"
              onClick={this.onResetClick}
              disabled={this.props.apiCallLoading}
            >
              Reset Password
            </Button>
            {this.state.errorMsg ? <FailureMessage>{this.state.errorMsg}</FailureMessage> : null}
          </div>
        )}

        {this.props.status && this.props.status === 'success' ? (
          <SuccessMessage>Password was reset successfully. Please sign-in</SuccessMessage>
        ) : this.props.status && this.props.status === 'failure' ? (
          <FailureMessage>Error occurred while password reset</FailureMessage>
        ) : null}
      </Form>
    )
  }
}

ResetPassword.defaultProps = {}

ResetPassword.propTypes = {}

const mapStateToProps = state => {
  return {
    status: state.root && state.root.getIn(['guest', 'resetPassword', 'status']),
    apiCallLoading: state.root && state.root.getIn(['global', 'apiCallLoading']),
  }
}

const mapDispatchToProps = dispatch => ({
  resetPassword(password, code) {
    dispatch(resetPasswordAction(password, code))
  },

  clearResetPasswordStatus() {
    dispatch(clearForgotPasswordStatusAction())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword)
