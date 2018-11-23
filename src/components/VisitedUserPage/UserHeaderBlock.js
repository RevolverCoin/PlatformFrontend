import React from 'react'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import sanitize from 'sanitize-html'

import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Github,
  Reddit,
  Bitcoin,
} from 'styled-icons/fa-brands'
import { Globe } from 'styled-icons/fa-solid'
import { UrlMatcher } from '../../utils/misc'

const Container = styled.div`
  text-align: left;
  padding: 20px;
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

const Description = styled.p`
  word-wrap: break-word;
  white-space: pre-wrap;
`

const SupportBlock = styled.div`
  margin-top: 20px;
`

const Row = styled.div`
  margin: 10px 0;
`

const Header = styled.div`
  display: inline-block;
  width: 120px;
`
const HeaderLinks = styled.span`
  float: left;
  width: 120px;
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
const ContentLink = styled(Content)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-transform: none;
  display: block;
`

const LinksBlock = styled.div`
  margin: 20px 0;
`
const Icon = styled.span`
  color: #bbb;
  width: 120px;
  float: left;
`
const SupportDescription = styled.p`
  color: #1f363d;
  margin-left: 120px;
  font-style: italic;
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
    this.props.removeSupport(this.props.addressMy, this.props.address, this.props.userId)
  }

  parseLink(url) {
    if (UrlMatcher.isUrlYoutube(url)) {
      return <Youtube size="24" />
    }

    if (UrlMatcher.isUrlFacebook(url)) {
      return <Facebook size="24" />
    }

    if (UrlMatcher.isUrlReddit(url)) {
      return <Reddit size="24" />
    }

    if (UrlMatcher.isUrlGithub(url)) {
      return <Github size="24" />
    }

    if (UrlMatcher.isUrlInstagram(url)) {
      return <Instagram size="24" />
    }

    if (UrlMatcher.isUrlTwitter(url)) {
      return <Twitter size="24" />
    }

    if (UrlMatcher.isUrlBitcointalk(url)) {
      return <Bitcoin size="24" />
    }

    return <Globe size="24" />
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
            <img src={this.props.avatar} width="140" style={{ 'border-radius': '50%' }} />
          ) : (
            <Avatar name={this.props.username} size="140" round={true} />
          )}

          <Info>
            <Username>{this.props.username}</Username>
            <Description
              dangerouslySetInnerHTML={{
                __html: this.props.description ? sanitize(this.props.description) : '',
              }}
            />
          </Info>
        </DescriptionBlock>

        <LinksBlock>
          {this.props.website ? (
            <Row>
              <Icon>
                <Globe size="24" />
              </Icon>
              <a href={this.props.website} target="_blank">
                <ContentLink>{this.props.website}</ContentLink>
              </a>
            </Row>
          ) : null}
          {this.props.links &&
            this.props.links.map((link, index) => (
              <Row key={index}>
                <Icon>{this.parseLink(link)}</Icon>
                <a href={link} target="_blank">
                  <ContentLink>{link}</ContentLink>
                </a>
              </Row>
            ))}
        </LinksBlock>

        <AddressBlock>
          <Row>
            <Header>Address</Header>
            <ContentAddress>
              <div>{this.props.address}</div>
            </ContentAddress>
          </Row>
        </AddressBlock>

        <SupportBlock>
          <Row>
            <Header>Supporting</Header>
            <Content>
              {!this.props.public ? (
                <Link to={`/supports/${this.props.userId}/supporting`}>
                  {supportingCount} Supports
                </Link>
              ) : (
                <div>{supportingCount} Supports</div>
              )}
            </Content>
          </Row>
          <Row>
            <Header>Supported</Header>
            <Content>
              {!this.props.public ? (
                <Link to={`/supports/${this.props.userId}/supported`}>
                  {supportedCount} Supports
                </Link>
              ) : (
                <div>{supportedCount} Supports</div>
              )}
            </Content>
          </Row>

          {!this.props.public ? (
            <Row>
              <Header />
              <Content>{SupportingButton}</Content>
              {!supported ? <SupportDescription>Support locks 1 XRE </SupportDescription> : ''}
            </Row>
          ) : null}
        </SupportBlock>
      </Container>
    )
  }
}

export default UserHeaderBlock
