import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BasePage from './basepage'
import ProfileBlock from '../../containers/ProfileBlock'


class ProfilePage extends BasePage {
  
  renderPage() {
    return (
      <ProfileBlock
      username={this.props.userProfileUsername}
      description={this.props.userProfileDescription}
      email={this.props.userProfileEmail}
      address={this.props.userProfileAddress}
      userId={this.props.userProfileId}
    />
    )
  }
}


ProfilePage.defaultProps = {
  userProfileUsername: '',
  userProfileDescription: '',
  userProfileEmail: '',
  userProfileAddress: '',
  userProfileId: '',
}

ProfilePage.propTypes = {
  userProfileUsername: PropTypes.string,
  userProfileDescription: PropTypes.string,
  userProfileEmail: PropTypes.string,
  userProfileAddress: PropTypes.string,
  userProfileId: PropTypes.string,
}

const mapStateToProps = (state) => {
  const { root } = state
  const profile = root.getIn(['user', 'profile'])

  return {
    userProfileUsername: profile && profile.get('username'),
    userProfileDescription: profile && profile.get('description'),
    userProfileEmail: profile && profile.get('email'),
    userProfileAddress: profile && profile.get('address'),
    userProfileId: profile && profile.get('id'),
  }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
