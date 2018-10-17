import React from 'react'
import styled from 'styled-components';
import UserPostsItem from '../../containers/UserPostsItem'



class UserPostListBlock extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const blocks = this.props.userPosts && this.props.userPosts.map((data)=>(
      <UserPostsItem 
        key={data.id} 
        username={data.user.username}
        avatar={data.user.avatar} 
        text={data.text} 
        date={data.timestamp}/>
    ));

    
    return (
      <div>
        {blocks}         
      </div>
    )
  }
}

export default UserPostListBlock
