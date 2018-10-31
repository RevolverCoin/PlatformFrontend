import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import BasePage from './basepage'
import UserPostsItem from '../UserPostsItem'
import { Link } from 'react-router-dom'

import { requestTimelinePostsAction } from '../../actions/actions'

const Panel = styled.div`
  background-color:white;
  text-align:left;
  border: 1px solid #a1a1a1;
`

const Caption = styled.div`
  background-color: #fafafa;
  border-bottom: 1px solid #a1a1a1;
  color: #832e55;
  text-transform:uppercase;
  font-size:14px;
  padding:8px 0 8px 15px;
`
const Category = styled.div`
  display: inline-block;
  padding: 0 5px;
  margin-right:10px;
  //font-weight: ${props => (props.active ? 'bold' : 'normal')};
  color: ${props => (props.active ? '#832e55' : '#333')};
`

class TimelinePage extends BasePage {
  componentDidMount() {
    this.props.requestTimelinePosts(0)
  }

  renderPage() {
    let postsList =
      this.props.postsResults &&
      this.props.postsResults.map(post => (
        <UserPostsItem
          username={post.userId.username}
          avatar={post.userId.avatar}
          date={post.createdAt}
          key={post._id}
          text={post.text}
          id={post.userId._id}
        />
      ))

    return (
        <Panel>
        <Caption>
          <Link to='/myposts/'>
            <Category>My Posts</Category>
          </Link>
          <Link to='/timeline/'>
            <Category active>My Timeline</Category>
          </Link>
          
          <Link to='/discover/'>
            <Category>Discover</Category>
          </Link>          
        </Caption>
        {postsList}
      </Panel>        
    )
  }
}

TimelinePage.defaultProps = {}

TimelinePage.propTypes = {}

const mapStateToProps = state => {
  // get profiles of supporting
  const data = state.root && state.root.getIn(['timeline', 'posts'])
  return {
    postsResults: data && data.toJS()
  }
}

const mapDispatchToProps = dispatch => ({
  requestTimelinePosts() {
    dispatch(requestTimelinePostsAction())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimelinePage)
