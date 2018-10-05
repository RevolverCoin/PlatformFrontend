import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BasePage from './basepage'
import SearchBlock from '../../containers/SearchBlock'

import { requestSearchProfilesAction, requestSearchPostsAction } from '../../actions/actions'



class SearchPage extends BasePage {

  fetchSearch()
  {
    const urlParams = new URLSearchParams(this.props.location.search);
    const query= urlParams.get('query');

    this.props.requestSearchProfiles(query)
    this.props.requestSearchPosts(query, 0)
  }

  componentDidMount() {
    this.fetchSearch();
  }

  componentDidUpdate(prevProps) {
    
    if (this.props.location.search !== prevProps.location.search) {
      this.fetchSearch();
    }
  } 
  renderPage() {

    return (
      <SearchBlock searchProfilesResults={this.props.searchProfilesResults} searchPostsResults={this.props.searchPostsResults}/>
    )
  }
}


SearchPage.defaultProps = {
  requestProfileSearchAction: null,
}

SearchPage.propTypes = {
  requestProfileSearchAction: PropTypes.func,
}

function prepareSearchProfilesData(state)
{
  const data = state && state.root && state.root.getIn(['current','searchProfiles']);
  if (!data) return null;

  return data.toJS();
}

function prepareSearchPostsData(state)
{
  const data = state && state.root && state.root.getIn(['current','searchPosts']);
  if (!data) return null;

  return data.toJS().posts;
}


const mapStateToProps = (state) => ({
  searchProfilesResults: prepareSearchProfilesData(state),
  searchPostsResults: prepareSearchPostsData(state),
})

const mapDispatchToProps = dispatch => ({
  requestSearchProfiles(query) {
    dispatch(requestSearchProfilesAction(query))
  },
  
  requestSearchPosts(query, pageId) {
    dispatch(requestSearchPostsAction(query, pageId))
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
