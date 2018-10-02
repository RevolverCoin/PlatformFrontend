import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BasePage from './basepage'
import ProfileBlock from '../../containers/ProfileBlock'

import { getProfileInfoAction } from '../../actions/actions'


class ProfilePage extends BasePage {
  
  componentDidMount() {
    this.props.getProfileInfoAction()
  }
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
  getProfileInfoAction: null,
}

ProfilePage.propTypes = {
  userProfileUsername: PropTypes.string,
  userProfileDescription: PropTypes.string,
  userProfileEmail: PropTypes.string,
  userProfileAddress: PropTypes.string,
  userProfileId: PropTypes.string,
  getProfileInfoAction: PropTypes.func,
}

const mapStateToProps = (state) => {
  const { root } = state
  const profile = root.hasIn(['user', 'profile']) && root.getIn(['user', 'profile'])

  return {
    userProfileUsername: profile && profile.get('username'),
    userProfileDescription: profile && profile.get('description'),
    userProfileEmail: profile && profile.get('email'),
    userProfileAddress: profile && profile.get('address'),
    userProfileId: profile && profile.get('id'),
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileInfoAction() {
    dispatch(getProfileInfoAction())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
