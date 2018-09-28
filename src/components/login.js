import React from 'react'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class LoginPage extends React.Component {
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

  render() {
    return (
      <div className="m-t-xl">
        <Container>
          <Row>
            <Col md="4" md-offset="4">
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
              <p>or</p>
              <p><Link to="/signup">Create new account</Link></p>
              <p className="mui--text-danger">{this.props.errorMsg ? this.props.errorMsg : ''}</p>
            </Col>
          </Row>
        </Container>
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
