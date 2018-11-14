import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import BasePage from './basepage'
import PostItem from '../PostItem'
import UserMenu from '../../components/UserMenu'

import { requestTimelinePostsAction } from '../../actions/actions'

const Panel = styled.div`
  background-color: white;
  text-align: left;
  border: 1px solid #a1a1a1;
`

class TimelinePage extends BasePage {
  componentDidMount() {
    this.props.requestTimelinePosts(0)
  }

  renderPage() {
    let postsList =
      this.props.postsResults &&
      this.props.postsResults.map(post => (
        <PostItem
          username={post.userId.username}
          avatar={post.userId.avatar}
          date={post.createdAt}
          key={post._id}
          text={post.text}
          userId={post.userId._id}
          postId={post._id}
          likes={post.likes}
        />
      ))

    return (
      <Panel>
        <UserMenu active="timeline" />
        {postsList}
      </Panel>
    )
  }
}

TimelinePage.defaultProps = {}

TimelinePage.propTypes = {}

const mapStateToProps = state => {
  // get profiles of supporting
  const data = state.root && state.root.getIn(['timeline', 'posts'])
  return {
    postsResults: data && data.toJS(),
  }
}

const mapDispatchToProps = dispatch => ({
  requestTimelinePosts() {
    dispatch(requestTimelinePostsAction())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimelinePage)
