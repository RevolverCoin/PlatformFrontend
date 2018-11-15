import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import BasePage from './basepage'
import PostItem from '../PostItem'
import UserMenu from '../../components/UserMenu'
import MainButton from '../../components/MainButton'

import { requestDiscoverPostsAction, clearDiscoverPostsAction } from '../../actions/actions'


const Panel = styled.div`
  background-color: white;
  text-align: left;
  border: 1px solid #a1a1a1;
`
const More = styled.div`
  text-align: center;
  margin: 20px 0;
`

class DiscoverPage extends BasePage {
  constructor(props) {
    super(props)
    this.onLoadMore = this.onLoadMore.bind(this)
  }

  componentDidMount() {
    this.props.clearDiscoverPosts()
    this.props.requestDiscoverPosts(1)
  }

  onLoadMore() {
    this.props.requestDiscoverPosts(this.props.nextPageId)
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
        <UserMenu active="discover" />
        {postsList}

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

DiscoverPage.defaultProps = {}

DiscoverPage.propTypes = {}

const mapStateToProps = state => {
  // get profiles of supporting
  const data = state.root && state.root.get('discover')

  return {
    posts: data && data.get('posts').toJS(),
    hasNextPage: data && data.get('hasNextPage'),
    nextPageId: data && data.get('nextPageId'),
  }
}

const mapDispatchToProps = dispatch => ({
  clearDiscoverPosts() {
    dispatch(clearDiscoverPostsAction())
  },
  requestDiscoverPosts(pageId) {
    dispatch(requestDiscoverPostsAction(pageId))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiscoverPage)
