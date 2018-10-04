import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BasePage from '../basepage'
import UserBlock from './UserBlock'

import { getUserPostsAction, getUserProfileAction } from '../../../actions/actions'


class UserPage extends BasePage {

  componentDidMount() {
    // load posts
    const userId = this.props.match.params.userId;
    this.props.getUserPosts(userId, 0)

    // load profile
    this.props.getUserProfile(userId)
  }

  renderPage() {
    return (
      <UserBlock
      username={this.props.userProfile.username}
      description={this.props.userProfile.desc}
      address={this.props.userProfile.address}
      userPosts={this.props.userPosts}
    />
    )
  }
}


UserPage.defaultProps = {
  getUserPosts: null,
}

UserPage.propTypes = {
  getUserPosts: PropTypes.func,
}

function prepareUserPostsData(state)
{
  const data = state && state.root && state.root.hasIn(['current','posts']) && state.root.getIn(['current','posts']);
  if (!data) return null;

  return data.toJS().posts;
}

function prepareUserProfileData(state)
{
  const data = state && state.root && state.root.hasIn(['current','userProfile']) && state.root.getIn(['current','userProfile']);
  if (!data) return null;
  return data.toJS();
}


const mapStateToProps = (state) => {
  
   return {
     userPosts: prepareUserPostsData(state),
     userProfile: prepareUserProfileData(state)
  }
}

const mapDispatchToProps = dispatch => ({
  getUserPosts(userId, pageId) {
    dispatch(getUserPostsAction(userId, pageId))
  },

  getUserProfile(userId) {
    dispatch(getUserProfileAction(userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
