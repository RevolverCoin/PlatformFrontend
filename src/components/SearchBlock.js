import React from 'react'
import styled from 'styled-components';
import UserListItem from '../containers/pages/VisitedUserPage/UserListItem'
import SearchPostsItem from '../containers/SearchPostsItem'


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


class SearchBlock extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {


    let searchProfilesList = this.props.searchProfilesResults && this.props.searchProfilesResults.map( (user) => (
      <UserListItem  username={user.username} description={user.desc} key={user.id} id={user.id}/>
    ))

    let searchPostsList = this.props.searchPostsResults && this.props.searchPostsResults.map( (post) => (
      <SearchPostsItem  username={post.user.username} date={post.timestamp} key={post.id} text={post.text} id={post.user.id}/>
    ))

    if (!searchProfilesList) searchProfilesList = [];
    if (!searchPostsList) searchPostsList = [];

    const searchList = searchProfilesList.concat(searchPostsList)
    

    return (
      <Panel>
        <Caption>Search results</Caption>
        
        {searchList}

      </Panel>
    )
  }
}

export default SearchBlock
