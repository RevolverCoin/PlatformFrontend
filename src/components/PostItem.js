import React from 'react'
import styled from 'styled-components'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'

import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

import Linkify from 'react-linkify'

import { promiseChainify, testImage, urlRegex } from '../utils/misc'

import { ThumbsUp } from 'styled-icons/feather'
import { Comment } from 'styled-icons/octicons'
import { Share, Delete } from 'styled-icons/material'

const Container = styled.div`
  padding: 5px;
  text-align: left;
  border-bottom: 1px solid #d1d1d1;
  position: relative;

  display: flex;
  flex-wrap: wrap;

`
const LeftColumn = styled.div`
  display: inline-block;
  width: 52px;
  vertical-align: top;
  padding: 10px;
`

const RightColumn = styled.div`
  display: inline-block;
  width: 450px;
  padding: 10px 10px 10px 10px;

`

const Header = styled.div`
  padding-bottom: 10px;
  position: relative;
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

const SocialBlock = styled.div`
  margin: 10px 0 0 0;
  padding: 5px 0 0;
  border-top: 1px solid #d1d1d1;
  text-align: center;
  flex:auto;

`
const SocialStats = styled.div`
  text-align: left;
  border-bottom: 1px solid #d1d1d1;
  padding-bottom: 5px;
`

const SocialStatsSpan = styled.span`
  padding: 0 5px;
`

const SocialControls = styled.div`
  margin: 10px 5px 5px;
  cursor: pointer;
`

const Disabled = styled.div`
  color: #ccc;
  cursor: default;
`

const Enabled = styled.div`
  color: ${props => (props.active ? '#2a60af' : '#333')};
`
const ShareLink = styled.a`
  color: #333;
  :hover {
    text-decoration: none;
  }
`
const DeleteControl = styled.div`
  position: absolute;
  top: 14px;
  right: 25px;
  cursor: pointer;
`

class PostItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageUrl: null,
      videoUrl: null,
      text: this.props.text && this.props.text.hexDecode(),
    }

    if (this.props.text) this.parseText(this.props.text)

    this.onLikeClick = this.onLikeClick.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidUpdate(prevProps) {
    
    if (this.props.text !== prevProps.text) {
      this.setState({text: this.props.text && this.props.text.hexDecode()})
      if (this.props.text) 
        this.parseText(this.props.text)
    }
  }


  async processImage(text) {
    let urls = []
    text.replace(urlRegex, url => {
      const httpsUrl = url.replace(/^http:\/\//i, 'https://')
      urls.push(testImage(httpsUrl))
    })

    if (urls.length === 0) return false

    const results = await promiseChainify(urls)
    if (!results || results.length === 0) return false

    const validUrl = results.find(result => result != null)

    if (validUrl && typeof validUrl !== 'undefined') {
      const updatedText = text.replace(validUrl, '')
      this.setState({ imageUrl: validUrl, text: updatedText })
      return true
    }

    return false
  }

  processVideo(text) {
    let regExp = /(?:[?&]vi?=|\/embed\/|\/\d\d?\/|\/vi?\/|https?:\/\/(?:www\.)?youtu\.be\/)([^&\n?#]+)/i
    const match = text.match(regExp)

    if (match) {
      const updatedText = text.replace(match[0], '')
      this.setState({ videoUrl: `https://www.youtube.com/embed/${match[1]}`, text: updatedText })
    }
  }

  async parseText(text) {
    text = text.hexDecode()

    await this.processImage(text)
    this.processVideo(text)
  }

  onLikeClick() {
    this.props.requestLikePost(this.props.postId)
  }

  onDeleteClick() {
    const sure = window.confirm('Delete post. Are you sure?')
    if (sure) this.props.requestDeletePost(this.props.postId)
  }

  render() {
    const postTime = new Date(this.props.date).toLocaleString()

    const likes = typeof this.props.likes === 'undefined' ? 0 : this.props.likes.length
    const comments = 0

    // true if there is like for this post from actor
    const likeFromMe =
      likes > 0 && typeof this.props.likes.find(item => item === this.props.myId) !== 'undefined'

    const myPost = this.props.myId === this.props.userId

    const LikeControl = myPost || this.props.public ? Disabled : Enabled

    return (
      <Container>
        <LeftColumn>
          <Link to={'/user/' + this.props.userId}>
            {this.props.avatar ? (
              <img src={this.props.avatar} width="50" style={{ 'border-radius': '50%' }} />
            ) : (
              <Avatar name={this.props.username} size="50" round={true} />
            )}
          </Link>
        </LeftColumn>
        <RightColumn>
          <Header>
            <StyledLink to={'/user/' + this.props.userId}>
              <UserName>{this.props.username}</UserName>
            </StyledLink>
            <PostDate>{postTime}</PostDate>
          </Header>
          <Linkify properties={{ target: '_blank' }}>
            <Text>{this.state.text}</Text>
          </Linkify>

          {this.state.imageUrl ? (
            <a href={this.state.imageUrl} target="_blank">
              <img src={this.state.imageUrl} width="100%" />
            </a>
          ) : (
            ''
          )}

          {this.state.videoUrl ? <iframe width="450" height="300" src={this.state.videoUrl} /> : ''}
        </RightColumn>  

        {myPost && (
          <DeleteControl onClick={this.onDeleteClick}>
            <Delete size="14" />
          </DeleteControl>
        )}

        <SocialBlock>
          {likes > 0 || comments > 0 ? (
            <SocialStats>
              {likes > 0 ? (
                <SocialStatsSpan>
                  <ThumbsUp size="14" /> {likes} likes
                </SocialStatsSpan>
              ) : null}

              {comments > 0 ? (
                <SocialStatsSpan>
                  <Comment size="14" /> {comments} comments
                </SocialStatsSpan>
              ) : null}
            </SocialStats>
          ) : null}
              

          <SocialControls>
            <Row>
              <Col md="4">
                <LikeControl active={likeFromMe}>
                  <span onClick={!myPost && !this.props.public ? this.onLikeClick : undefined}>
                    <ThumbsUp size="20" /> Like
                  </span>
                </LikeControl>
              </Col>
              <Col md="4">
                <Disabled>
                  <Comment size="20" /> Comment
                </Disabled>
              </Col>

              <Col md="4">
                <ShareLink href={'/public/post/' + this.props.postId} target="_blank">
                  <Share size="20" /> Share
                </ShareLink>
              </Col>
            </Row>

            <div style={{ clear: 'both' }} />
          </SocialControls>
        </SocialBlock>
      </Container>
    )
  }
}

export default PostItem
