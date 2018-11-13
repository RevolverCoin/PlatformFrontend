import React from 'react'
import request from 'superagent'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import RowMUI from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Form from 'muicss/lib/react/form'
import InputMUI from 'muicss/lib/react/input'
import TextAreaMUI from 'muicss/lib/react/textarea'

import MainButton from './MainButton'
import Dropzone from './DropZone'
import config from '../config'
import { UrlMatcher } from '../utils/misc'

import { Delete } from 'styled-icons/material'

import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Github,
  Reddit,
  Bitcoin,
} from 'styled-icons/fa-brands'
import { Globe } from 'styled-icons/fa-solid'

const Label = styled.label`
  font-weight: bold;
`

const LabelForInput = styled.label`
  font-weight: bold;
  line-height: 30px;
`

const Delimiter = styled.div`
  margin-bottom: 30px;
`

const Input = styled(InputMUI)`
  padding-top: 0;
`

const TextArea = styled(TextAreaMUI)`
  min-height: 80px;
  margin-top: 0;
  padding-top: 0;
`
const Panel = styled.div`
  background-color:white;
  text-align:center;
  border: 1px solid #a1a1a1;
  padding: 20px 10px;
`

const Caption = styled.div`
  text-transform: uppercase;
  margin: 0;
  text-align: left;
  border: 1px solid #a1a1a1;
  border-bottom:none;
  background: #fafafa;
  font-size: 14px;
  color: #832e55;
  padding:8px 0 8px 15px;
`
const Row = styled(RowMUI)`
  margin: 15px 0;
`
const IconDelete = styled(Delete)`
  cursor: pointer;
`

const AddLink = styled.div`
  text-decoration: underline;
  cursor: pointer;
  text-align: left;
  display: table;
`
const LinkIcon = styled.div`
  color: #999;
  margin-top: 4px;
`

class ProfileBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: this.props.data.username,
      description: this.props.data.description,
      avatar: null,
      uploadedFileUrl: '',
      website: this.props.data.website,
      links: this.props.data.links,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this)
    this.handleLinkChange = this.handleLinkChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onImageDrop = this.onImageDrop.bind(this)
    this.onAddLinkClick = this.onAddLinkClick.bind(this)
    this.onDeleteLinkClick = this.onDeleteLinkClick.bind(this)
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
    if (this.checkPropUpdated('username', prevProps))
      updateState['username'] = this.props.data.username

    if (this.checkPropUpdated('description', prevProps))
      updateState['description'] = this.props.data.description

    if (this.checkPropUpdated('avatar', prevProps)) updateState['avatar'] = this.props.data.avatar

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
      .post(config.CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', config.CLOUDINARY_UPLOAD_PRESET)
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
    const { username, description, avatar, website, links, uploadedFileUrl } = this.state

    let updatedAvatar = null
    if (uploadedFileUrl) updatedAvatar = uploadedFileUrl
    else if (avatar) updatedAvatar = avatar

    // remove empty items
    const linksTrim = links.filter(item => item.trim())

    this.props.updateProfileInfo({
      description,
      username,
      avatar: updatedAvatar,
      website,
      links: linksTrim,
    })

    if (linksTrim.length !== links.length) {
      this.setState({ links: linksTrim })
    }
  }

  /*
   * handleInputChange
   * max: 50 chars
   */
  handleInputChange(e) {
    if (e.target.value.length > 50) return

    this.setState({ [e.target.name]: e.target.value })
  }

  /*
   * handleTextAreaChange
   * max: 150 chars
   */
  handleTextAreaChange(e) {
    if (e.target.value.length > 150) return

    this.setState({ [e.target.name]: e.target.value })
  }

  handleLinkChange(e) {
    const index = parseInt(e.target.name)
    const links = this.state.links
    links[index] = e.target.value

    this.setState({ links })
  }

  /*
   * onAddLinkClick
   */
  onAddLinkClick() {
    // limit number of links to 10
    if (this.state.links.length >= 10) return

    const links = this.state.links
    links.push('')
    this.setState({ links })
  }

  onDeleteLinkClick(index) {
    const links = this.state.links

    links.splice(index, 1)
    this.setState({ links })
  }

  parseLink(url) {
    if (UrlMatcher.isUrlYoutube(url)) {
      return <Youtube size="24" />
    }

    if (UrlMatcher.isUrlFacebook(url)) {
      return <Facebook size="24" />
    }

    if (UrlMatcher.isUrlReddit(url)) {
      return <Reddit size="24" />
    }

    if (UrlMatcher.isUrlGithub(url)) {
      return <Github size="24" />
    }

    if (UrlMatcher.isUrlInstagram(url)) {
      return <Instagram size="24" />
    }

    if (UrlMatcher.isUrlTwitter(url)) {
      return <Twitter size="24" />
    }

    if (UrlMatcher.isUrlBitcointalk(url)) {
      return <Bitcoin size="24" />
    }

    return <Globe size="24" />
  }

  /*
   * render
   */
  render() {
    const links = this.state.links.map((url, index) => {
      return (
        <Row key={url + index}>
          {/* <Col md="2" className="mui--text-left"><LabelForInput>Link #{index}</LabelForInput></Col> */}
          <Col md="3" className="mui--text-left">
            <LinkIcon>{this.parseLink(url)}</LinkIcon>
          </Col>
          <Col md="8">
            <Input name={index} id={'link' + index} onChange={this.handleLinkChange} value={url} />
          </Col>
          <Col md="1">
            <IconDelete size="16" onClick={() => this.onDeleteLinkClick(index)} />
          </Col>
        </Row>
      )
    })

    return (
      <div>
        <Caption>Profile</Caption>
        <Panel>
          <Form>
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
                <LabelForInput htmlFor="edit-profile-name">Name</LabelForInput>
              </Col>
              <Col md="9">
                <Input
                  name="username"
                  id="edit-profile-name"
                  placeholder={this.props.data.username}
                  onChange={this.handleInputChange}
                  value={this.state.username}
                />
              </Col>
            </Row>
            <Row>
              <Col md="3" className="mui--text-left">
                <Label htmlFor="edit-profile-description">Description</Label>
              </Col>
              <Col md="9">
                <TextArea
                  name="description"
                  id="edit-profile-description"
                  placeholder={this.props.data.description}
                  onChange={this.handleTextAreaChange}
                  value={this.state.description}
                  rows="2"
                />
              </Col>
            </Row>
            <Row>
              <Col md="3" className="mui--text-left">
                <Label>Email</Label>
              </Col>
              <Col md="9">
                <p className="mui--text-left">{this.props.data.email}</p>
              </Col>
            </Row>

            <Row>
              <Col md="3" className="mui--text-left">
                <Label>Address</Label>
              </Col>
              <Col md="9">
                <p className="mui--text-left">{this.props.data.address}</p>
              </Col>
            </Row>

            <Row>
              <Col md="3" className="mui--text-left">
                <LabelForInput>Website</LabelForInput>
              </Col>
              <Col md="9">
                <Input
                  name="website"
                  id="edit-website"
                  placeholder={this.props.data.website}
                  onChange={this.handleInputChange}
                  value={this.state.website}
                />
              </Col>
            </Row>

            {links}

            <Row>
              <Col md="3" />
              <Col md="9">
                <AddLink onClick={this.onAddLinkClick}>+ Add link</AddLink>
              </Col>
            </Row>

            <MainButton className="revolver-btn-main" handleAction={this.onSubmit} text="Update" />
          </Form>
        </Panel>
      </div>
    )
  }
}

ProfileBlock.defaultProps = {}

ProfileBlock.propTypes = {
  updateProfileInfo: PropTypes.func.isRequired,
}

export default ProfileBlock
