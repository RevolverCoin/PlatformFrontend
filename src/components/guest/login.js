import React from 'react'
import styled from 'styled-components'

import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


import BaseFormPage from './baseFormPage'


const CreateNewAccountLink = styled.p`
  font-size: 18px;
`

class LoginPage extends BaseFormPage {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.handleLoginAction = this.handleLoginAction.bind(this)
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

  handleLoginAction(e) {
    e.preventDefault()
    const { email, password } = this.state
    this.props.loginAction({ email, password })
  }

  getCaption() {
    return 'Sign In'
  }

  renderPage() {
    return (
      <div>
        <Form>
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
          <Button color="primary" onClick={e => this.handleLoginAction(e)}>
            Login
          </Button>
        </Form>
        <p>
          <Link to="/forgotpassword">Forgot password</Link>
        </p>

        <p>or</p>
        <CreateNewAccountLink>
          <Link to="/signup">Create new account</Link>
        </CreateNewAccountLink>
        <p className="mui--text-danger">{this.props.errorMsg ? this.props.errorMsg : ''}</p>
      </div>
    )
  }
}

LoginPage.defaultProps = {
  errorMsg: '',
}

LoginPage.propTypes = {
  loginAction: PropTypes.func.isRequired,
  clearErrorsAction: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
}

export default LoginPage
