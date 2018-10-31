import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import BasePage from './basepage'
import UserPostsItem from '../UserPostsItem'
import { Link } from 'react-router-dom'

import { requestDiscoverPostsAction } from '../../actions/actions'

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

class DiscoverPage extends BasePage {
  componentDidMount() {
    this.props.requestDiscoverPosts(0)
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
            <Category>My Timeline</Category>
          </Link>
          
          <Link to='/discover/'>
            <Category active>Discover</Category>
          </Link>          
        </Caption>
        {postsList}
      </Panel>        
    )
  }
}

DiscoverPage.defaultProps = {}

DiscoverPage.propTypes = {}

const mapStateToProps = state => {
  // get profiles of supporting
  const data = state.root && state.root.getIn(['current', 'discover'])
  if (!data) return {}

  return {
    postsResults: data.toJS()
  }
}

const mapDispatchToProps = dispatch => ({
  requestDiscoverPosts() {
    dispatch(requestDiscoverPostsAction())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiscoverPage)
