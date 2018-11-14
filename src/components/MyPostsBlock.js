import React from 'react'

import PropTypes from 'prop-types'
import Immutable from 'immutable'
import CreateNewPostBlock from './../containers/CreateNewPostBlock'
import PostItem from '../containers/PostItem'
import UserMenu from './UserMenu'

import styled from 'styled-components'

const Panel = styled.div`
  background-color: white;
  text-align: left;
  border: 1px solid #a1a1a1;
`
const UserPostItemContainer = styled.div`
  border-top: 1px solid #d1d1d1;
`

class MyPostsBlock extends React.Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    this.props.clearMyPrevPostsAction()
    this.props.getMyPostsAction(1)
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    const windowHeight =
      'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
    const body = document.body
    const html = document.documentElement
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    )
    const windowBottom = windowHeight + window.pageYOffset
    if (windowBottom >= docHeight && this.props.userPostsHasNextPage) {
      this.props.getMyPostsAction(this.props.userPostsNextPageId)
    }
  }

  render() {
    const loader = (
      <div className="text-center m-t-md m-b-md">
        <img width="40px" height="40" src={require('../img/loader.svg')} alt="loader" />
      </div>
    )

    return (
      <Panel>
        <UserMenu active="myposts" />
        <div className="m-b-sm">
          <CreateNewPostBlock username={this.props.username} avatar={this.props.avatar} />
          {this.props.userPostsFetchingNewPost === true ? loader : null}
        </div>
        <div>
          
          {this.props.userPostsList.map(post => (
            <UserPostItemContainer key={post.id}>
              <PostItem
                username={post.username}
                avatar={post.avatar}
                date={post.timestamp}
                text={post.text}
                userId={this.props.userId}
                postId={post.id}
                likes={post.likes}
              />
            </UserPostItemContainer>
          ))}
          {this.props.userPostsFetchingPosts === true ? loader : null}
        </div>
      </Panel>
    )
  }
}

MyPostsBlock.defaultProps = {
  userPostsError: null,
  userPostsNextPageId: null,
  username: '',
}

MyPostsBlock.propTypes = {
  clearMyPrevPostsAction: PropTypes.func.isRequired,
  getMyPostsAction: PropTypes.func.isRequired,
  username: PropTypes.string,
  userPostsList: PropTypes.instanceOf(Immutable.List).isRequired,
  userPostsError: PropTypes.object,
  userPostsFetchingNewPost: PropTypes.bool.isRequired,
  userPostsFetchingPosts: PropTypes.bool.isRequired,
  userPostsHasNextPage: PropTypes.bool.isRequired,
  userPostsNextPageId: PropTypes.number,
}

export default MyPostsBlock
