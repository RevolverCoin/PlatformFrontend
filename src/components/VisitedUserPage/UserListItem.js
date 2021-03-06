import React from 'react'
import styled from 'styled-components'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
import sanitize from 'sanitize-html'

const Container = styled.div`
  padding: 20px;
  border-bottom: 1px solid #a1a1a1;
`
const LeftColumn = styled.div`
  display: inline-block;
  width: 100px;
  vertical-align: top;
  padding: 10px;
`

const UserAvatar = styled.img``

const RightColumn = styled.div`
  display: inline-block;
  width: 330px;
  padding: 10px 10px 10px 10px;
`

const Header = styled.div`
  padding-bottom: 10px;
`

const UserName = styled.span`
  font-weight: bold;
  font-size: 15px;
`

const Description = styled.p`
  word-wrap: break-word;
  white-space: pre-wrap;
`

const StyledLink = styled(Link)`
  color: #1f363d;
`

class UserListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <LeftColumn>
          <Link to={'/user/' + this.props.id}>
            {this.props.avatar ? (
              <img src={this.props.avatar} width="90" style={{'border-radius': '50%'}} />
            ) : (
              <Avatar name={this.props.username} size="90" round={true} />
            )}
          </Link>
        </LeftColumn>
        <RightColumn>
          <Header>
            <StyledLink to={'/user/' + this.props.id}>
              <UserName>{this.props.username}</UserName>
            </StyledLink>
          </Header>
          <Description dangerouslySetInnerHTML={{__html: this.props.description? sanitize(this.props.description): ''}}/>
        </RightColumn>
      </Container>
    )
  }
}

export default UserListItem
