import React from 'react'
import styled from 'styled-components';
import UserPostBlock from '../../containers/pages/UserPage/UserPostBlock'



class UserPostListBlock extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const blocks = this.props.userPosts && this.props.userPosts.map((data)=>(
      <UserPostBlock key={data.id} username={this.props.username} text={data.text} date={data.timestamp}/>
    ));

    // const blocks = null;
    return (
      <div>
        {blocks}         
      </div>
    )
  }
}

export default UserPostListBlock
