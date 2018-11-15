import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import PropTypes from 'prop-types'

import BasePage from '../basepage'
import UserBlock from './UserBlock'

import { 
  getVisitedUserPostsAction, 
  getVisitedUserInfoAction,
  clearVisitedUserPostsAction
} from '../../../actions/actions'

class UserPage extends BasePage {
  componentDidMount() {
    // load posts
    const userId = this.props.match.params.userId

    if (userId === this.props.myId) {
      this.props.redirectToMyPosts()
    } else {

      this.props.clearVisitedUserPosts();

      this.props.getVisitedUserPosts(userId, 1)

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
        website={this.props.userProfile.website}
        links={this.props.userProfile.links}
        userPosts={this.props.userPosts}
        hasNextPage={this.props.hasNextPage}
        nextPageId={this.props.nextPageId}
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

function prepareUserProfileData(state) {
  const data =
    state &&
    state.root &&
    state.root.hasIn(['visitedUser', 'profile']) &&
    state.root.getIn(['visitedUser', 'profile'])
  if (!data) return null

  return data.toJS()
}

function prepareSupportsData(state) {
  const data =
    state &&
    state.root &&
    state.root.hasIn(['visitedUser', 'supports']) &&
    state.root.getIn(['visitedUser', 'supports'])
  if (!data) return null
  return data.toJS()
}

const mapStateToProps = state => {
  const posts = state.root && state.root.getIn(['visitedUser', 'posts'])

  return {
    myId: state.root && state.root.getIn(['user', 'profile', 'id']),
    userPosts: posts && posts.get('posts').toJS(),
    hasNextPage: posts && posts.get('hasNextPage'),
    nextPageId: posts && posts.get('nextPageId'),
    userProfile: prepareUserProfileData(state),
    supports: prepareSupportsData(state),
  }
}

const mapDispatchToProps = dispatch => ({
  
  clearVisitedUserPosts()
  {
    dispatch(clearVisitedUserPostsAction())
  },

  getVisitedUserPosts(userId, pageId) {
    dispatch(getVisitedUserPostsAction(userId, pageId))
  },

  getVisitedUserInfo(userId) {
    dispatch(getVisitedUserInfoAction(userId))
  },

  redirectToMyPosts() {
    dispatch(push('/myposts'))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPage)
