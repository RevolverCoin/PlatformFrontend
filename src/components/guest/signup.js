import React from 'react'
import styled from 'styled-components'

import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseFormPage from './baseFormPage'

const AlreadyHaveAccount = styled.p`
  font-size: 16px;
  margin-top:5px;
`
const SuccessMessage = styled.p`
  color: #3b9068;
`
const FailureMessage = styled.p`
  color: #c9341d;
`


class SignupPage extends BaseFormPage {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    }
    this.handleSignupAction = this.handleSignupAction.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillUnmount() {
    if (this.props.errorMsg) {
      this.props.clearErrorsAction()
    }
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSignupAction(e) {
    e.preventDefault()
    const { username, email, password, passwordConfirm } = this.state

    this.props.signupAction({
      username,
      email,
      password,
      passwordConfirm,
    })
  }

  getCaption() {
    return 'Sign up'
  }

  renderPage() {
    return (
      <div>
        <Form>
          <Input
            label="Username"
            type="text"
            name="username"
            onChange={this.handleInputChange}
            floatingLabel
            required
          />
          <Input
            label="Email Address"
            type="email"
            name="email"
            onChange={this.handleInputChange}
            floatingLabel
            required
          />
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
          <Button color="primary" onClick={e => this.handleSignupAction(e)}>
            Sign Up
          </Button>
        </Form>
        
        <AlreadyHaveAccount>
          Already have an account? <Link to="/login">Sign in</Link>
        </AlreadyHaveAccount>
       
        {this.props.status && this.props.status === 'success' ? (
             <SuccessMessage>
              Verification code was sent to your email. 
              </SuccessMessage>
          ) : this.props.status && this.props.status === 'failure' ? (
            <FailureMessage> 
              Error occurred during signup.
            </FailureMessage>
          ): null
          }


      </div>
    )
  }
}

SignupPage.defaultProps = {
}

SignupPage.propTypes = {
}

export default SignupPage
