import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BasePage from './basepage'
import MyPostsBlock from '../../containers/MyPostsBlock'



class HomePage extends BasePage {

  renderPage() {
    return (
      <MyPostsBlock/>
    )
  }
}



HomePage.defaultProps = {
  userProfileUsername: '',
  userProfileDescription: '',
  userProfileEmail: '',
  userProfileId: '',

}

HomePage.propTypes = {
  userProfileUsername: PropTypes.string,
  userProfileDescription: PropTypes.string,
  userProfileEmail: PropTypes.string,
  userProfileId: PropTypes.string,
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

})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
