import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import PropTypes from 'prop-types'

import BasePage from '../basepage'
import UserBlock from './UserBlock'

import { getUserPostsAction, getVisitedUserInfoAction } from '../../../actions/actions'


class UserPage extends BasePage {

  componentDidMount() {
    // load posts
    const userId = this.props.match.params.userId;

    if (userId === this.props.myId) {
      this.props.redirectToMyPosts()
    } else {
      this.props.getUserPosts(userId, 0)

      // load profile
      this.props.getVisitedUserInfo(userId)
    }
  }

  renderPage() {
    return (
      <UserBlock
      username={this.props.userProfile.username}
      avatar={this.props.userProfile.avatar}
      description={this.props.userProfile.desc}
      address={this.props.userProfile.address}
      userPosts={this.props.userPosts}
      supports={this.props.supports}
      userId={this.props.match.params.userId} 
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

function prepareSupportsData(state)
{
  const data = state && state.root && state.root.hasIn(['current','supports']) && state.root.getIn(['current','supports']);
  if (!data) return null;
  return data.toJS();
}

const mapStateToProps = (state) => {
   return {
     myId: state && state.root && state.root.getIn(['user','profile','id']),
     userPosts: prepareUserPostsData(state),
     userProfile: prepareUserProfileData(state),
     supports: prepareSupportsData(state)
  }
}

const mapDispatchToProps = dispatch => ({
  getUserPosts(userId, pageId) {
    dispatch(getUserPostsAction(userId, pageId))
  },

  getVisitedUserInfo(userId) {
    dispatch(getVisitedUserInfoAction(userId))
  },

  redirectToMyPosts()
  {
    dispatch(push('/myposts'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
