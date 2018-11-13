import React from 'react'
import styled from 'styled-components'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'

import Linkify from 'react-linkify'

import { promiseChainify, testImage, urlRegex } from '../utils/misc'

const Container = styled.div`
  padding: 5px;
  border-bottom: 1px solid #a1a1a1;
  text-align: left;
`
const LeftColumn = styled.div`
  display: inline-block;
  width: 52px;
  vertical-align: top;
  padding: 10px;
`


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

const StyledLink = styled(Link)`
  color: #1f363d;
`

const Text = styled.div`
  word-wrap: break-word;
  white-space: pre-wrap;
`

class UserPostsItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageUrl: null,
      videoUrl: null,
      text: this.props.text.hexDecode(),
    }

    if (this.props.text) this.parseText(this.props.text)

  }

  async processImage(text) {
    let urls = []
    text.replace(urlRegex, url => {
      urls.push(testImage(url))
    })

    if (urls.length === 0) return false
   

    const results = await promiseChainify(urls)
    if (!results || results.length === 0) return false

    const validUrl = results.find(result => result != null)

    if (validUrl && typeof validUrl !== 'undefined') {
      const updatedText = text.replace(validUrl, '')
      this.setState({ imageUrl: validUrl, text: updatedText })
      return true;
    }
    
    return false
  }

  processVideo(text) {
    let regExp = /(?:[?&]vi?=|\/embed\/|\/\d\d?\/|\/vi?\/|https?:\/\/(?:www\.)?youtu\.be\/)([^&\n?#]+)/i;
    const match = text.match(regExp);

    if (match) {

      const updatedText = text.replace(match[0], '')
      this.setState({ videoUrl: `http://www.youtube.com/embed/${match[1]}`, text: updatedText})
    }
  }

  async parseText(text) {
    text = text.hexDecode()

    await this.processImage(text)
    this.processVideo(text)
  }

  render() {
    const postTime = new Date(this.props.date).toLocaleString()

    return (
      <Container>
        <LeftColumn>
          <Link to={'/posts/' + this.props.id}>
            {this.props.avatar ? (
              <img src={this.props.avatar} width="50" style={{'border-radius': '50%'}} />
            ) : (
              <Avatar name={this.props.username} size="50" round={true} />
            )}
          </Link>
        </LeftColumn>
        <RightColumn>
          <Header>
            <StyledLink to={'/posts/' + this.props.id}>
              <UserName>{this.props.username}</UserName>
            </StyledLink>
            <PostDate>{postTime}</PostDate>
          </Header>
          <Linkify properties={{target: '_blank'}}>
            <Text>{this.state.text}</Text>
          </Linkify>

          {this.state.imageUrl ? (
            <img src={this.state.imageUrl} width='100%'/>
          ) : ('')}

          {this.state.videoUrl ? (
              <iframe width="400" height="300"
              src={this.state.videoUrl}>
              </iframe>
            ) : ('')}
              

        </RightColumn>
      </Container>
    )
  }
}

export default UserPostsItem
