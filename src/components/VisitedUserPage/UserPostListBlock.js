import React from 'react'
import styled from 'styled-components'

import PostItem from '../../containers/PostItem'
import MainButton from '../MainButton'



const More = styled.div`
  text-align: center;
  margin: 20px 0;
`
class UserPostListBlock extends React.Component {

  constructor(props) {
    super(props)
    this.onLoadMore = this.onLoadMore.bind(this)
  }

  onLoadMore() {
    this.props.getVisitedUserPosts(this.props.userId, this.props.nextPageId)
  }

  render() {
    const blocks =
      this.props.userPosts &&
      this.props.userPosts.map(post => (
        <PostItem
          key={post._id}
          username={post.user.username}
          avatar={post.user.avatar}
          text={post.text}
          date={post.timestamp}
          userId={post.user.id}
          postId={post._id}
          likes={post.likes}
        />
      ))

    return (
      <div>
        {blocks}

        {this.props.hasNextPage ? (
          <More>
            <MainButton
              className="revolver-btn-main"
              handleAction={this.onLoadMore}
              text="Load more ..."
            />
          </More>
        ) : null}
      </div>
    )
  }
}

export default UserPostListBlock
