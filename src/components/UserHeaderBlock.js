import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  text-align: left;
  padding: 10px;
`

const DescriptionBlock = styled.div``

const ProfileImage = styled.img`
  display: inline-block;
  width: 140px;
  text-align: left;
  border: 1px solid #a1a1a1;
`
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

const SupportInfo = styled.div`
  margin-top: 20px;
`

const Row = styled.div`
  margin: 10px 0;
`

const Header = styled.div`
  display: inline-block;
  width: 160px;
`

const Content = styled.div`
  display: inline-block;
  color: #832e55;
  text-decoration: underline;
  text-transform: uppercase;
  cursor: pointer;
`

class UserHeaderBlock extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <DescriptionBlock>
          <ProfileImage src="/images/profileImage.png" />
          <Info>
            <Username>{this.props.username}</Username>
            <Description>{this.props.description}</Description>
          </Info>
        </DescriptionBlock>
        <SupportInfo>
          <Row>
            <Header>Supporting</Header>
            <Content>9 Supports</Content>
          </Row>
          <Row>
            <Header>Supported</Header>
            <Content>12 Supports</Content>
          </Row>
        </SupportInfo>
      </Container>
    )
  }
}

export default UserHeaderBlock
