import React from 'react'
import styled from 'styled-components';
import UserHeaderBlock from '../../containers/pages/VisitedUserPage/UserHeaderBlock'
import UserPostListBlock from '../../containers/pages/VisitedUserPage/UserPostListBlock'


const Panel = styled.div`
  background-color:white;
  text-align:left;
  border: 1px solid #a1a1a1;
`

const PostsCaption = styled.div`
  background-color: #fafafa;
  border-top: 1px solid #a1a1a1;
  border-bottom: 1px solid #a1a1a1;
  color: #832e55;
  text-transform:uppercase;
  font-size:14px;
  padding:8px 0 8px 15px;
`

const UserPostsBlock = styled.div`
  background-color:white;
  text-align:left;
  min-height:50px;
`

class UserBlock extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {

    return (
      <Panel>
        <UserHeaderBlock 
          username={this.props.username} 
          description={this.props.description} 
          address={this.props.address}/>

        <PostsCaption> Posts </PostsCaption>
        
        <UserPostListBlock userPosts={this.props.userPosts} username={this.props.username} />
      </Panel>
    )
  }
}

export default UserBlock
