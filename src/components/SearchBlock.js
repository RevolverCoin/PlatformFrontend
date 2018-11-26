import React from 'react'
import styled from 'styled-components'
import UserListItem from '../containers/pages/VisitedUserPage/UserListItem'
import PostItem from '../containers/PostItem'
import MainButton from './MainButton'

const Panel = styled.div`
  background-color: white;
  text-align: left;
  border: 1px solid #a1a1a1;
`

const Caption = styled.div`
  background-color: #f1f1f1;
  border-bottom: 1px solid #a1a1a1;
  color: #832e55;
  text-transform: uppercase;
  font-size: 14px;
  padding: 8px 0 8px 15px;
`

const More = styled.div`
  text-align: center;
  margin: 20px 0;
`
const NothingFoundMessage = styled.div`
  text-align: center;
  padding: 10px;
`

class SearchBlock extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let searchProfilesList =
      this.props.searchProfilesResults &&
      this.props.searchProfilesResults.map(user => (
        <UserListItem
          username={user.username}
          description={user.desc}
          avatar={user.avatar}
          key={user.id}
          id={user.id}
        />
      ))

    let searchPostsList =
      this.props.searchPostsResults &&
      this.props.searchPostsResults.map(post => (
        <PostItem
          username={post.user.username}
          date={post.timestamp}
          key={post._id}
          text={post.text}
          userId={post.user.id}
          avatar={post.user.avatar}
          postId={post._id}
          likes={post.likes}
        />
      ))

    return (
      <Panel>
        <Caption>Search results</Caption>

        {searchProfilesList.length === 0 && searchPostsList.length === 0 ? (
           <NothingFoundMessage>Nothing found</NothingFoundMessage>
        ) : null}
        
        {searchProfilesList ? searchProfilesList : null}
        
        {this.props.hasNextPageProfiles ? (
          <More>
            <MainButton
              className="revolver-btn-main"
              handleAction={this.props.loadMoreProfiles}
              text="Load more ..."
            />
          </More>
        ) : null}
        
        {searchPostsList ? searchPostsList : null}

        {this.props.hasNextPagePosts ? (
          <More>
            <MainButton
              className="revolver-btn-main"
              handleAction={this.props.loadMorePosts}
              text="Load more ..."
            />
          </More>
        ) : null}

      </Panel>
    )
  }
}

export default SearchBlock
