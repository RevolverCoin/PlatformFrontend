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
  background-color: #f1f1f1;
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
          avatar={this.props.avatar}  
          description={this.props.description} 
          address={this.props.address}
          website={this.props.website}
          links={this.props.links}
          supports={this.props.supports}
          userId={this.props.userId}
          internal={this.props.internal}
          />

        <PostsCaption> Posts </PostsCaption>
        
        <UserPostListBlock 
          userPosts={this.props.userPosts}
          hasNextPage={this.props.hasNextPage}
          nextPageId={this.props.nextPageId}           
          username={this.props.username}
          userId={this.props.userId} />
      </Panel>
    )
  }
}

export default UserBlock
