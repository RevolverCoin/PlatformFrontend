import React from 'react'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  text-align: left;
  padding: 20px;
`

const DescriptionBlock = styled.div``

const Info = styled.div`
  display: inline-block;
  width: 320px;
  vertical-align: top;
  padding: 0 0 0 30px;
`

const Username = styled.h2`
  margin-top: 10px;
  margin-bottom: 10px;
`

const Description = styled.p``

const Row = styled.div`
  margin: 10px 0;
`

const Header = styled.div`
  display: inline-block;
  width: 110px;
`

const Content = styled.div`
  display: inline-block;
  color: #832e55;
  text-decoration: underline;
  text-transform: uppercase;
  cursor: pointer;
`

const AddressBlock = styled.div``

const ContentAddress = styled(Content)`
  text-transform: none;
  text-decoration: none;
  color: #1f363d;
  cursor: auto;
`

class UserTopListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <DescriptionBlock>
          <Link to={'/posts/' + this.props.id}>
            {this.props.avatar ? (
              <img src={this.props.avatar} width="80" style={{ 'border-radius': '50%' }} />
            ) : (
              <Avatar name={this.props.username} size="80" round={true} />
            )}
          </Link>
          <Info>
            <Username>{this.props.username}</Username>
            <Description>{this.props.description}</Description>
          </Info>
        </DescriptionBlock>

        <AddressBlock>
          <Row>
            <Header>Address</Header>
            <ContentAddress>
              <div>{this.props.address}</div>
            </ContentAddress>
          </Row>
        </AddressBlock>

        <Row>
          <Header>Supports</Header>
          <ContentAddress>
            <div>{this.props.supportCount}</div>
          </ContentAddress>
        </Row>
      </Container>
    )
  }
}

export default UserTopListItem
