import React from 'react'
import PropTypes from 'prop-types'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Panel from 'muicss/lib/react/panel'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import MainButton from './MainButton'

const profileBlockStyle = {
  label: {
    lineHeight: 4.5,
    display: 'block',
  },
}

class ProfileBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      description: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.username !== state.username || props.email !== state.email) {
      return {
        username: props.username,
        description: props.description,
      }
    }
    return null
  }

  onSubmit() {
    const {
      username, description,
    } = this.state

    if (username && description) {
      this.props.updateProfileInfoAction({
        description, username,
      })
    }
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Panel>
        <Form>
          <Container className="edit-profile-block">
            <legend className="mui--text-left">Profile</legend>
            <Row className="m-t-md m-b-md">
              <Col md="12" className="mui--text-left">
                <p className="mui--text-left">Update avatar</p>
              </Col>
            </Row>
            <Row>
              <Col md="3" className="mui--text-left">
                <label style={profileBlockStyle.label} htmlFor="edit-profile-name">Name</label>
              </Col>
              <Col md="9">
                <Input
                  name="username"
                  id="edit-profile-name"
                  label="Required"
                  style={profileBlockStyle.input}
                  placeholder={this.state.username}
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col md="3" className="mui--text-left">
                <label style={profileBlockStyle.label} htmlFor="edit-profile-description">Description</label>
              </Col>
              <Col md="9">
                <Input
                  name="description"
                  id="edit-profile-description"
                  label="Required"
                  placeholder={this.state.description}
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Row>
            <Row className="m-t-md m-b-md">
              <Col md="3" className="mui--text-left">
                <label htmlFor="name">Email:</label>
              </Col>
              <Col md="9">
                <p className="mui--text-left">{this.props.email}</p>
              </Col>
            </Row>
            <MainButton handleAction={this.onSubmit} text="Update" />
          </Container>
        </Form>
      </Panel>
    )
  }
}

ProfileBlock.defaultProps = {
  email: '',
}

ProfileBlock.propTypes = {
  email: PropTypes.string,
  updateProfileInfoAction: PropTypes.func.isRequired,
}

export default ProfileBlock
