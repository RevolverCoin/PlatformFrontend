import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import BasePage from './basepage'
import PostItem from '../PostItem'
import UserMenu from '../../components/UserMenu'
import MainButton from '../../components/MainButton'

import { requestTimelinePostsAction, clearTimelinePostsAction } from '../../actions/actions'

const Panel = styled.div`
  background-color: white;
  text-align: left;
  border: 1px solid #a1a1a1;
`
const NoPostsMessage = styled.div`
  text-align: center;
  padding: 10px;
`
const More = styled.div`
  text-align: center;
  margin: 20px 0;
`

class TimelinePage extends BasePage {
  constructor(props) {
    super(props)
    this.onLoadMore = this.onLoadMore.bind(this)
  }

  componentDidMount() {
    this.props.clearTimelinePosts()
    this.props.requestTimelinePosts(1)
  }

  onLoadMore() {
    this.props.requestTimelinePosts(this.props.nextPageId)
  }

  renderPage() {
    let postsList =
      this.props.posts &&
      this.props.posts.map(post => (
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
        {postsList && postsList.length > 0 ? (
          postsList
        ) : (
          <NoPostsMessage>No posts available</NoPostsMessage>
        )}

        {this.props.hasNextPage ? (
          <More>
            <MainButton
              className="revolver-btn-main"
              handleAction={this.onLoadMore}
              text="Load more ..."
            />
          </More>
        ) : null}
      </Panel>
    )
  }
}

TimelinePage.defaultProps = {}

TimelinePage.propTypes = {}

const mapStateToProps = state => {

  const data = state.root && state.root.get('timeline')
  return {
    posts: data && data.get('posts').toJS(),
    hasNextPage: data && data.get('hasNextPage'),
    nextPageId: data && data.get('nextPageId'),
  }

}

const mapDispatchToProps = dispatch => ({
  requestTimelinePosts(pageId) {
    dispatch(requestTimelinePostsAction(pageId))
  },

  clearTimelinePosts() {
    dispatch(clearTimelinePostsAction())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimelinePage)
