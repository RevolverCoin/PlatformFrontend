import React from 'react'
import request from 'superagent'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Panel from 'muicss/lib/react/panel'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import MainButton from './MainButton'
import Dropzone from './DropZone'

// TODO: move to config
const CLOUDINARY_UPLOAD_PRESET = 'pr1j8jti'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/xre/upload'

const profileBlockStyle = {
  label: {
    lineHeight: 4.5,
    display: 'block',
  },
}

const Delimiter = styled.div`
  margin-bottom: 30px;
`

class ProfileBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      description: null,
      avatar: null,
      uploadedFileUrl: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onImageDrop = this.onImageDrop.bind(this)
  }

  checkPropUpdated(name, prevProps) {
    return (
      this.props.data[name] !== prevProps.data[name] && this.state[name] !== this.props.data[name]
    )
  }

  /*
  * componentDidUpdate
  */
  componentDidUpdate(prevProps) {
    let updateState = {}
    if (this.checkPropUpdated('username', prevProps)) updateState['username'] = this.props.data.username

    if (this.checkPropUpdated('description', prevProps))
      updateState['description'] = this.props.data.description

    if (this.checkPropUpdated('avatar', prevProps)) 
      updateState['avatar'] = this.props.data.avatar

    if (Object.keys(updateState).length !== 0) this.setState(updateState)
  }

  /*
  * onImageDrop
  */
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0],
    })

    this.handleImageUpload(files[0])
  }

  /*
  * handleImageUpload
  */

  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err)
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileUrl: response.body.secure_url,
        })
      }
    })
  }

  /*
  * onSubmit
  */
  onSubmit() {
    const { username, description, avatar, uploadedFileUrl } = this.state

    let updatedAvatar = null
    if (uploadedFileUrl) updatedAvatar = uploadedFileUrl
    else if (avatar) updatedAvatar = avatar

    console.log(username, description)

    this.props.updateProfileInfo({
      description,
      username,
      avatar: updatedAvatar,
    })
  }

  /*
  * handleInputChange
  */
  handleInputChange(e) {
    this.setState({ [e.target.name] : e.target.value})
  }

  /*
  * render
  */
  render() {

    return (
      <Panel>
        <Form>
          <Container className="edit-profile-block">
            <legend className="mui--text-left">Profile</legend>
            <Row className="m-t-md m-b-md">
              <Col md="12" className="mui--text-left">
                <p className="mui--text-left">Update avatar 200 x 200px</p>

                <Dropzone onDrop={this.onImageDrop.bind(this)} />
              </Col>
            </Row>

            <Row>
              <Col md="12" className="mui--text-left">
                <div>
                  {this.state.uploadedFileUrl === '' ? null : (
                    <div>
                      <img src={this.state.uploadedFileUrl} />
                      <Delimiter />
                    </div>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col md="3" className="mui--text-left">
                <label style={profileBlockStyle.label} htmlFor="edit-profile-name">
                  Name
                </label>
              </Col>
              <Col md="9">
                <Input
                  name="username"
                  id="edit-profile-name"
                  label="Required"
                  style={profileBlockStyle.input}
                  placeholder={this.props.data.username}
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col md="3" className="mui--text-left">
                <label style={profileBlockStyle.label} htmlFor="edit-profile-description">
                  Description
                </label>
              </Col>
              <Col md="9">
                <Input
                  name="description"
                  id="edit-profile-description"
                  label="Required"
                  placeholder={this.props.data.description}
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
                <p className="mui--text-left">{this.props.data.email}</p>
              </Col>
            </Row>

            <Row className="m-t-md m-b-md">
              <Col md="3" className="mui--text-left">
                <label htmlFor="name">Address:</label>
              </Col>
              <Col md="9">
                <p className="mui--text-left">{this.props.data.address}</p>
              </Col>
            </Row>

            <MainButton handleAction={this.onSubmit} text="Update" />
          </Container>
        </Form>
      </Panel>
    )
  }
}

ProfileBlock.defaultProps = {}

ProfileBlock.propTypes = {
  updateProfileInfo: PropTypes.func.isRequired,
}

export default ProfileBlock
