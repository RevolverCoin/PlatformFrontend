import React from 'react'
import styled from 'styled-components'
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom'

const Container = styled.div`
  padding: 5px;
  border-bottom: 1px solid #a1a1a1;
`
const LeftColumn = styled.div`
  display: inline-block;
  width: 52px;
  vertical-align: top;
  padding: 10px;
`

const UserAvatar = styled.img``

const RightColumn = styled.div`
  display: inline-block;
  width: 400px;
  padding: 10px 10px 10px 10px;
`

const Header = styled.div`
  padding-bottom: 10px;
`

const UserName = styled.span`
  font-weight: bold;
  font-size: 15px;
`

const PostDate = styled.span`
  margin-left: 30px;
`

const StyledLink = styled(Link) `
  color: #1f363d;
`
const Content = styled.p``

class UserPostsItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const postTime = new Date(this.props.date).toDateString()

    return (
      <Container>
        <LeftColumn>
          <Link to={'/posts/' + this.props.id}>
            <Avatar name={this.props.username} size='50'/>
          </Link>
        </LeftColumn>
        <RightColumn>
          <Header>
            <StyledLink to={'/posts/' + this.props.id}>
              <UserName>{this.props.username}</UserName>
              </StyledLink>
            <PostDate>{postTime}</PostDate>
          </Header>
          <Content>{this.props.text}</Content>
        </RightColumn>
      </Container>
    )
  }
}

export default UserPostsItem
