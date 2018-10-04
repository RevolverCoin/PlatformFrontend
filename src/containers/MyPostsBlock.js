import { connect } from 'react-redux'
import { getMyPostsAction, clearMyPrevPostsAction } from '../actions/actions'

import MyPostsBlock from '../components/MyPostsBlock'

const mapStateToProps = (state) => {
  const { root } = state
  const posts = root.hasIn(['user', 'posts']) && root.getIn(['user', 'posts'])

  const username = root.getIn(['user', 'profile', 'username']);

  return {
    username, 
    userPostsList: posts && posts.get('postsList'),
    userPostsError: posts && posts.get('error'),
    userPostsFetchingNewPost: posts && posts.get('fetchingNewPost'),
    userPostsFetchingPosts: posts && posts.get('fetchingPosts'),
    userPostsHasNextPage: posts && posts.get('hasNextPage'),
    userPostsNextPageId: posts && posts.get('nextPageId'),
  }
}

const mapDispatchToProps = dispatch => ({
  getMyPostsAction(pageId) {
    dispatch(getMyPostsAction(pageId))
  },
  clearMyPrevPostsAction() {
    dispatch(clearMyPrevPostsAction())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPostsBlock)
