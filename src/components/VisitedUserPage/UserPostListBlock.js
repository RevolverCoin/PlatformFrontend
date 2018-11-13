import React from 'react'
import UserPostsItem from '../../containers/UserPostsItem'



class UserPostListBlock extends React.Component {

  render() {

    const blocks = this.props.userPosts && this.props.userPosts.map((data)=>(
      <UserPostsItem 
        key={data.id} 
        username={data.user.username}
        avatar={data.user.avatar} 
        text={data.text} 
        date={data.timestamp}
        id={data.user.id}/>
    ));

    
    return (
      <div>
        {blocks}         
      </div>
    )
  }
}

export default UserPostListBlock
