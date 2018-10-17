import React from 'react'
import Panel from 'muicss/lib/react/panel'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Avatar from 'react-avatar'
import Linkify from 'react-linkify'
import styled from 'styled-components'

import {promiseChainify, testImage} from '../utils/misc'

const mySinglePostBlockStyle = {
  postBlock: {
    marginBottom: '1px',
  },
  avatarWrapper: {
    paddingLeft: 0,
    paddingRight: 0,
    width: 'auto',
  },
  avatar: {
    width: '60px',
    height: '60px',
  },
  avatarText: {
    position: 'relative',
    top: '35%',
  },
  userName: {
    color: '#1f363d',
    fontWeight: 600,
  },
}

const Text = styled.p`
  word-wrap: break-word;
`

class MySinglePostBlock extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageUrl: null,
      text: this.props.text,
    }

    if (this.props.text)
      this.parseText(this.props.text)

  }

  async parseText(text)
  {
    const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    
    let urls = [] 
    text.replace(urlRegex, url => {
        urls.push(testImage(url))
    })  
    
    if (urls.length === 0)
      return;

    const results = await promiseChainify(urls)
    if (!results || results.length === 0)
      return;

    const validUrl = results.find(result => (result != null))
    
    if (validUrl && (typeof validUrl !== 'undefined')) {
      const updatedText = text.replace(validUrl,'')
      this.setState({imageUrl:validUrl, text:updatedText})
    }

  }

  render() {
    return (
      <Panel style={mySinglePostBlockStyle.postBlock}>
        <Container>
          <Row>
            <Col md="2" style={mySinglePostBlockStyle.avatarWrapper}>
              <div>
                {this.props.avatar ? (
                  <img src={this.props.avatar} width="60" />
                ) : (
                  <Avatar name={this.props.username} size="60" />
                )}
              </div>
            </Col>
            <Col md="10">
              <p className="mui--text-left">
                <Link to="" className="m-r-md" style={mySinglePostBlockStyle.userName}>
                  {this.props.username}
                </Link>
                <span>{this.props.date}</span>
              </p>
              <Linkify> 
                <Text className="mui--text-left">{this.state.text}</Text>
              </Linkify> 
              
              {this.state.imageUrl ? (
                <img src={this.state.imageUrl} width='100%'/>
              ) : ('')}

            </Col>
          </Row>
        </Container>
      </Panel>
    )
  }
}

MySinglePostBlock.defaultProps = {
  username: '',
}

MySinglePostBlock.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default MySinglePostBlock
