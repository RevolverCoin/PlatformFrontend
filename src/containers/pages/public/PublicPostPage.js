import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import Panel from 'muicss/lib/react/panel'

import PublicBasePage from './PublicBasePage'
import UserHeaderBlock from '../VisitedUserPage/UserHeaderBlock'
import PostItem from '../../PostItem'

import {requestPublicUserPostAction} from '../../../actions/actions'

const PostsCaption = styled.div`
  background-color: #f1f1f1;
  border-top: 1px solid #a1a1a1;
  border-bottom: 1px solid #a1a1a1;
  color: #832e55;
  text-transform:uppercase;
  font-size:14px;
  padding:8px 0 8px 15px;
`
const Message = styled.p`
  margin-top:10px;
  font-style: italic;
`


class PublicPostPage extends PublicBasePage {
  constructor(props) {
    super(props)
  }

  componentDidMount()
  {
    this.props.requestPublicUserPost(this.props.postId)
  }

  renderPage() {
    return <Panel>
        <UserHeaderBlock 
            username={this.props.profile.username} 
            avatar={this.props.profile.avatar} 
            description={this.props.profile.description} 
            address={this.props.profile.address} 
            website={this.props.profile.website} 
            links={this.props.profile.links} 
            supports={this.props.supports} 
            userId={this.props.post.userId} 
            public={true} />

        <PostsCaption> Post </PostsCaption>

        <PostItem 
            username={this.props.profile.username} 
            avatar={this.props.profile.avatar} 
            text={this.props.post.text} 
            date={this.props.post.createdAt} 
            userId={this.props.post.userId} 
            postId={this.props.post._id} 
            likes={this.props.post.likes}
            public={true} />

        <Message>Please sign in to view all posts</Message>
      </Panel>
  }
}

const mapStateToProps = state => {
  const profile = state.root && state.root.getIn(['public', 'user', 'profile'])
  const supports = state.root && state.root.getIn(['public', 'user', 'supports'])
  const post = state.root && state.root.getIn(['public', 'user', 'post'])

  return {
    profile: profile && profile.toJS(),
    supports: supports && supports.toJS(),
    post: post && post.toJS()
  }
}

const mapDispatchToProps = dispatch => ({
  requestPublicUserPost(postId)
  {
    dispatch(requestPublicUserPostAction(postId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PublicPostPage)
