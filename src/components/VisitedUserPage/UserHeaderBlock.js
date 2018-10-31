import React from 'react'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
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

const SupportBlock = styled.div`
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


const AddressBlock = styled.div`

`
const ContentAddress = styled(Content)`
  text-transform:none;
  text-decoration: none;
  color: #1f363d;
  cursor:auto;
`


class UserHeaderBlock extends React.Component {
  constructor(props) {
    super(props)

    this.handleSupport = this.handleSupport.bind(this)
    this.handleUnsupport = this.handleUnsupport.bind(this)
  }

  handleSupport() {
    this.props.addSupport(this.props.addressMy, this.props.address, this.props.userId)
  }

  handleUnsupport() {
    this.props.removeSupport(this.props.addressMy, this.props.address,this.props.userId)
  }

  render() {
    let supportingCount =
      this.props.supports && this.props.supports.supporting && this.props.supports.supporting.length
    let supportedCount =
      this.props.supports && this.props.supports.supported && this.props.supports.supported.length

    if (!supportingCount) supportingCount = 0
    if (!supportedCount) supportedCount = 0

    let supported = false
    if (this.props.supports && this.props.supports.supported) {
      const result = this.props.supports.supported.find(
        val => val.addressFrom === this.props.addressMy,
      )
      supported = typeof result !== 'undefined'
    }

    let SupportingButton = null
    if (!supported) {
      SupportingButton = (
        <div className="revolver-btn-main" onClick={this.handleSupport}>
          Support
        </div>
      )
    } else {
      SupportingButton = (
        <div className="revolver-btn-main" onClick={this.handleUnsupport}>
          Unsupport
        </div>
      )
    }

      return (
      <Container>
        <DescriptionBlock>
          {this.props.avatar ? (
            <img src={this.props.avatar} width="140" />
          ) : (
            <Avatar name={this.props.username} size="140" />
          )}

          <Info>
            <Username>{this.props.username}</Username>
            <Description>{this.props.description}</Description>
          </Info>
        </DescriptionBlock>

        <AddressBlock>
        <Row>
            <Header>Address</Header>
            <ContentAddress><div>{this.props.address}</div></ContentAddress>
          </Row>
        </AddressBlock>

        <SupportBlock>
          <Row>
            <Header>Supporting</Header>
            <Content><Link to={`/supports/${this.props.userId}/supporting`}>{supportingCount} Supports</Link></Content>
          </Row>
          <Row>
            <Header>Supported</Header>
            <Content><Link to={`/supports/${this.props.userId}/supported`}>{supportedCount} Supports </Link></Content>
          </Row>
          <Row>
            <Header />
            <Content>{SupportingButton}</Content>
          </Row>
        </SupportBlock>
      </Container>
    )
  }
}

export default UserHeaderBlock
