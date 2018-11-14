import React from 'react'
import PostItem from '../../containers/PostItem'



class UserPostListBlock extends React.Component {

  render() {

    const blocks = this.props.userPosts && this.props.userPosts.map((post)=>(
      <PostItem 
        key={post.id} 
        username={post.user.username}
        avatar={post.user.avatar} 
        text={post.text} 
        date={post.timestamp}
        userId={post.user.id}
        postId={post.id}
        likes={post.likes}
        />
    ));

    
    return (
      <div>
        {blocks}         
      </div>
    )
  }
}

export default UserPostListBlock
