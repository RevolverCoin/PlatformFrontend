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
  margin-right: 10px;
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
  background: #fafafa;
  text-align:left;
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
    const links = this.props.userProfileLinks.map( (url, index) => {
      return (
        <p key={index}>
          <Icon>{this.parseLink(url)}</Icon>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </p>
      )
    })

    return (
      <Panel>
        <Wrapper className="m-b">
          <Link to="/myposts">
          {this.props.userProfileAvatar ? (
            <img src={this.props.userProfileAvatar} width="150" style={{borderRadius: '50%'}} />
          ) : (
            <Avatar name={this.props.userProfileUsername} size="150px" round={true} />
          )}
          </Link>
        </Wrapper>
        <Name>
          {this.props.userProfileUsername} <IconVerifiedUser size="15px" />
        </Name>
        <p>{this.props.userProfileDescription}</p>

        <Links>
          {this.props.userProfileWebsite ? (
            <p>
              <Icon>
                <Globe size="15" />
              </Icon>
              <a href={this.props.userProfileWebsite} target="_blank" rel="noopener noreferrer">
                {this.props.userProfileWebsite}
              </a>
            </p>
          ) : null}

          {links}
        </Links>

        <Link className="revolver-btn-main" to="/profile">
          Edit
        </Link>
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
