import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BasePage from './basepage'
import MyPostsBlock from '../../containers/MyPostsBlock'

import { getUserInfoAction } from '../../actions/actions'


class HomePage extends BasePage {
  componentDidMount() {
    this.props.getUserInfoAction()
  }
  renderPage() {
    return (
      <MyPostsBlock username={this.props.userProfileUsername} />
    )
  }
}



HomePage.defaultProps = {
  userProfileUsername: '',
  userProfileDescription: '',
  userProfileEmail: '',
  userProfileId: '',
  getUserInfoAction: null,
}

HomePage.propTypes = {
  userProfileUsername: PropTypes.string,
  userProfileDescription: PropTypes.string,
  userProfileEmail: PropTypes.string,
  userProfileId: PropTypes.string,
  getUserInfoAction: PropTypes.func,
}

const mapStateToProps = (state) => {
  const { root } = state
  const profile = root.hasIn(['user', 'profile']) && root.getIn(['user', 'profile'])

  return {
    userProfileUsername: profile && profile.get('username'),
    userProfileDescription: profile && profile.get('description'),
    userProfileEmail: profile && profile.get('email'),
    userProfileId: profile && profile.get('id'),
  }
}

const mapDispatchToProps = dispatch => ({
  getUserInfoAction() {
    
    dispatch(getUserInfoAction())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
