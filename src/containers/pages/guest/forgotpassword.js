import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'

import BaseFormPage from '../../../components/guest/baseFormPage'

import {forgotPasswordAction, clearForgotPasswordStatusAction} from '../../../actions/actions'


const SuccessMessage = styled.p`
  color: #3b9068;
`
const FailureMessage = styled.p`
  color: #c9341d;
`


class ForgotPassword extends BaseFormPage {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      errorMsg: '',
    }

    this.onResetClick = this.onResetClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount() {
    this.props.clearForgotPasswordStatus()
  }

  onResetClick(e) {
    e.preventDefault()
    this.props.clearForgotPasswordStatus();
    this.props.forgotPassword({ email: this.state.email })
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  getCaption() {
    return 'Forgot Password'
  }

  renderPage() {
    return (
      <Form>
        <Input
          label="Email Address"
          type="email"
          name="email"
          onChange={this.handleInputChange}
          floatingLabel
          required
        />

        <Button color="primary" onClick={this.onResetClick} disabled={this.props.apiCallLoading}>
          Reset Password
        </Button>

          {this.props.status && this.props.status === 'success' ? (
             <SuccessMessage>
              Please check your email, and click the link in the email you received to reset your password.
              </SuccessMessage>
          ) : this.props.status && this.props.status === 'failure' ? (
            <FailureMessage> 
              Email was not found
            </FailureMessage>
          ): null
          }
      </Form>
    )
  }
}

ForgotPassword.defaultProps = {}

ForgotPassword.propTypes = {}

const mapStateToProps = state => {
 
  return {
    status: state.root && state.root.getIn(['guest','forgotPassword','status']),
    apiCallLoading: state.root && state.root.getIn(['global','apiCallLoading'])
  }
}

const mapDispatchToProps = dispatch => ({

  forgotPassword(email) {
    dispatch(forgotPasswordAction(email))
  },

  clearForgotPasswordStatus() {
    dispatch(clearForgotPasswordStatusAction())
  }

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword)
