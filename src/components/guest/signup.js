import React from 'react'
import styled from 'styled-components'
import Recaptcha from 'react-recaptcha'

import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { passwordRegex } from '../../utils/misc'

import BaseFormPage from './baseFormPage'

const AlreadyHaveAccount = styled.p`
  font-size: 16px;
  margin-top: 5px;
`
const SuccessMessage = styled.p`
  color: #3b9068;
`
const FailureMessage = styled.p`
  color: #c9341d;
`
const CaptchaContainer = styled.div`
  text-align: center;
`

const Captcha = styled.div`
  display: inline-block;
`

class SignupPage extends BaseFormPage {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      captchaCode: null,
      errorMessage: null
    }
    this.handleSignupAction = this.handleSignupAction.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onCaptchaVerify = this.onCaptchaVerify.bind(this)
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



    const { username, email, password, passwordConfirm, captchaCode } = this.state

    let errorMessage = null
    
    if (!username.trim())
      errorMessage = 'Error: Username cannot be empty'
    else if (!email.trim())
      errorMessage = 'Error: Email cannot be empty'
    else if (!passwordRegex.test(password))
      errorMessage = 'Wrong password: password can consist of lowercase, uppercase and digit characters'
    else if (password !== passwordConfirm)
      errorMessage = 'Error: Password mismatch'
    else if (!captchaCode)
      errorMessage = 'Captcha verify error'

    if (errorMessage) { 
      this.setState({errorMessage})
    } else {
      this.props.signupAction({
        username,
        email,
        password,
        passwordConfirm,
      })
    }
  }

  getCaption() {
    return 'Sign up'
  }

  onCaptchaVerify(response)
  { 
    this.setState({captchaCode: response})
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
          <CaptchaContainer>
            <Recaptcha
              sitekey="6LcqwnsUAAAAAK1gRQuUBnp2DTbbLDnQs9Atsr44"
              verifyCallback={this.onCaptchaVerify}
            />
          </CaptchaContainer>

          <Button color="primary" onClick={e => this.handleSignupAction(e)}>
            Sign Up
          </Button>

          {this.state.errorMessage && <FailureMessage>{this.state.errorMessage}</FailureMessage>}
        </Form>

        <AlreadyHaveAccount>
          Already have an account? <Link to="/login">Sign in</Link>
        </AlreadyHaveAccount>

        {this.props.status && this.props.status === 'success' ? (
          <SuccessMessage>Verification code was sent to your email.</SuccessMessage>
        ) : this.props.status && this.props.status === 'failure' ? (
          <FailureMessage>Error occurred during signup.</FailureMessage>
        ) : null}
      </div>
    )
  }
}

SignupPage.defaultProps = {}

SignupPage.propTypes = {}

export default SignupPage
