import React from 'react'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SignupPage extends React.Component {
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
    const {
      username, email, password, passwordConfirm,
    } = this.state

    this.props.signupAction({
      username, email, password, passwordConfirm,
    })
  }

  render() {
    return (
      <div className="m-t-xl">
        <Container>
          <Row>
            <Col md="4" md-offset="4">
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
                <Button color="accent" onClick={e => this.handleSignupAction(e)}>
                  Sign Up
                </Button>
              </Form>
              <p>Already have an account? <Link to="/login">Log in</Link></p>
              <p className="mui--text-danger">{this.props.errorMsg ? this.props.errorMsg : ''}</p>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

SignupPage.defaultProps = {
  errorMsg: '',
}

SignupPage.propTypes = {
  signupAction: PropTypes.func.isRequired,
  clearErrorsAction: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
}

export default SignupPage
