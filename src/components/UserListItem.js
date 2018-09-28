import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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

const Desc = styled.p``

const StyledLink = styled(Link) `
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
          <Link to={'/posts/' + this.props.id}>
            <UserAvatar src="/images/profileImage.png" width="90px" />
          </Link>
        </LeftColumn>
        <RightColumn>
          <Header>
            <StyledLink to={'/posts/' + this.props.id}>
              <UserName>{this.props.username}</UserName>
            </StyledLink>
          </Header>
          <Desc>{this.props.description}</Desc>
        </RightColumn>
      </Container>
    )
  }
}

export default UserListItem
