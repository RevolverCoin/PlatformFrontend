import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import Panel from 'muicss/lib/react/panel'

import PublicBasePage from './PublicBasePage'
import UserHeaderBlock from '../VisitedUserPage/UserHeaderBlock'

import {requestPublicUserInfoAction} from '../../../actions/actions'

const PostsCaption = styled.div`
  background-color: #fafafa;
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


class PublicUserPage extends PublicBasePage {
  constructor(props) {
    super(props)
  }

  componentDidMount()
  {
    const userId = this.props.match.params.userId
    this.props.requestPublicUserInfo(userId)
  }

  componentWillReceiveProps(newProps) 
  {
    if (this.props.match.params.userId !== newProps.match.params.userId) {
      const userId = newProps.match.params.userId
      this.props.requestPublicUserInfo(userId)
    }
  }


  renderPage() {
    return (
      <Panel>
        <UserHeaderBlock 
          username={this.props.profile.username}
          avatar={this.props.profile.avatar}  
          description={this.props.profile.description} 
          address={this.props.profile.address}
          website={this.props.profile.website}
          links={this.props.profile.links}
          supports={this.props.supports}
          userId={null}
          public={true}
          />

        <PostsCaption> Posts </PostsCaption>

        <Message>Please sign in to view posts</Message>
      </Panel>
    )
  }
}

const mapStateToProps = state => {
  const profile = state.root && state.root.getIn(['public', 'user', 'profile'])
  const supports = state.root && state.root.getIn(['public', 'user', 'supports'])

  return {
    profile: profile && profile.toJS(),
    supports: supports && supports.toJS()
  }
}

const mapDispatchToProps = dispatch => ({
  requestPublicUserInfo(userId)
  {
    dispatch(requestPublicUserInfoAction(userId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PublicUserPage)
