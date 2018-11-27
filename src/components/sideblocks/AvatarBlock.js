import React from 'react'
import PanelMUI from 'muicss/lib/react/panel'
import PropTypes from 'prop-types'

import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

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
import { VerifiedUser } from 'styled-icons/material'

import { UrlMatcher } from '../../utils/misc'

const Icon = styled.span`
  color: #bbb;
  padding-right: 10px;
  float: left;
`

const IconVerifiedUser = styled(VerifiedUser)`
  color: #049;
`

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;

  img {
    border-radius: 50%;
  }
`
const Panel = styled.div`
  background: #f1f1f1;
  text-align: left;
  border: 1px solid #a1a1a1;
  text-align: center;
  padding: 20px;
`
const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`

const Links = styled.div`
  text-align: left;
  margin-bottom:15px;
`

const UrlText = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const Description = styled.p`
  word-wrap: break-word;
  white-space: pre-wrap;
`

const Delimiter = styled.div`
  margin: 15px 0;
  border-top: 1px solid #e2e2e2;
`

class AvatarBlock extends React.Component {
  constructor(props) {
    super(props)
  }

  parseLink(url) {
    if (UrlMatcher.isUrlYoutube(url)) {
      return <Youtube size="15" />
    }

    if (UrlMatcher.isUrlFacebook(url)) {
      return <Facebook size="15" />
    }

    if (UrlMatcher.isUrlReddit(url)) {
      return <Reddit size="15" />
    }

    if (UrlMatcher.isUrlGithub(url)) {
      return <Github size="15" />
    }

    if (UrlMatcher.isUrlInstagram(url)) {
      return <Instagram size="15" />
    }

    if (UrlMatcher.isUrlTwitter(url)) {
      return <Twitter size="15" />
    }

    if (UrlMatcher.isUrlBitcointalk(url)) {
      return <Bitcoin size="15" />
    }

    return <Globe size="15" />
  }

  render() {
    const links = this.props.userProfileLinks.map((url, index) => {
      return (
        <div key={index}>
          <Icon>{this.parseLink(url)}</Icon>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <UrlText>{url}</UrlText>
          </a>
        </div>
      )
    })

    return (
      <Panel>
        <Wrapper className="m-b">
          <Link to="/myposts">
            {this.props.userProfileAvatar ? (
              <img src={this.props.userProfileAvatar} width="150" style={{ borderRadius: '50%' }} />
            ) : (
              <Avatar name={this.props.userProfileUsername} size="150px" round={true} />
            )}
          </Link>
        </Wrapper>
        <Name>
          {this.props.userProfileUsername} <IconVerifiedUser size="15px" />
        </Name>
        <Description>{this.props.userProfileDescription}</Description>

        <Links>
          {this.props.userProfileWebsite ? (
            <div>
              <Icon>
                <Globe size="15" />
              </Icon>
              <a href={this.props.userProfileWebsite} target="_blank" rel="noopener noreferrer">
                <UrlText>{this.props.userProfileWebsite}</UrlText>
              </a>
            </div>
          ) : null}

          {links}
        </Links>

        <Link className="revolver-btn-main" to="/profile">
          Edit
        </Link>

        <Delimiter/>
        <p className="mui--text-center">
          <Link className="revolver-btn-main" to="/reward-report">
            Reward Report
          </Link>
        </p>
      </Panel>
    )
  }
}

AvatarBlock.defaultProps = {
  userProfileAvatar: '',
  userProfileUsername: '',
  userProfileDescription: '',
}

AvatarBlock.propTypes = {
  userProfileAvatar: PropTypes.string,
  userProfileUsername: PropTypes.string,
  userProfileDescription: PropTypes.string,
}

export default AvatarBlock
