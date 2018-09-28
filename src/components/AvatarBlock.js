import React from 'react'
import { Link } from 'react-router-dom'
import Panel from 'muicss/lib/react/panel'
import PropTypes from 'prop-types'
import avatar from './../img/avatar.png'

const avatarBlockStyles = {
  avatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  avatarText: {
    position: 'relative',
    top: '45%',
  },
}

const AvatarBlock = props => (
  <Panel className="m-t-md">
    <div style={avatarBlockStyles.avatar} className="m-b">
      <img src={avatar} alt="avatar" />
    </div>
    <p>{props.userProfileUsername}</p>
    <p>{props.userProfileDescription}</p>
    <Link className="revolver-btn-main" to="/profile">Edit</Link>
  </Panel>
)

AvatarBlock.defaultProps = {
  userProfileAvatar: '',
  userProfileUsername: '',
  userProfileDescription: '',
}

AvatarBlock.propTypes = {
  userProfileAvatar: PropTypes.string,
  userProfileUsername: PropTypes.string,
  userProfileDescription: PropTypes.string,
}

export default AvatarBlock
