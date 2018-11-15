import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BasePage from './basepage'
import SearchBlock from '../../containers/SearchBlock'

import {
  requestSearchProfilesAction,
  requestSearchPostsAction,
  clearSearchResultsAction,
} from '../../actions/actions'

class SearchPage extends BasePage {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
    }

    this.loadMoreProfiles = this.loadMoreProfiles.bind(this)
    this.loadMorePosts = this.loadMorePosts.bind(this)
  }

  fetchSearch() {
    const urlParams = new URLSearchParams(this.props.location.search)
    const query = urlParams.get('query')

    this.setState({ query })

    this.props.clearSearchResults()

    this.props.requestSearchProfiles(query, 1)
    this.props.requestSearchPosts(query, 1)
  }

  componentDidMount() {
    this.fetchSearch()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.fetchSearch()
    }
  }

  loadMoreProfiles() {
    this.props.requestSearchProfiles(this.state.query, this.props.nextPageIdProfiles)
  }

  loadMorePosts() {
    this.props.requestSearchPosts(this.state.query, this.props.nextPageIdPosts)
  }

  renderPage() {
    return (
      <SearchBlock
        searchProfilesResults={this.props.searchProfilesResults}
        searchPostsResults={this.props.searchPostsResults}
        loadMoreProfiles={this.loadMoreProfiles}
        loadMorePosts={this.loadMorePosts}
        hasNextPageProfiles={this.props.hasNextPageProfiles}
        hasNextPagePosts={this.props.hasNextPagePosts}
      />
    )
  }
}

SearchPage.defaultProps = {
  requestProfileSearchAction: null,
}

SearchPage.propTypes = {
  requestProfileSearchAction: PropTypes.func,
}

const mapStateToProps = state => {
  const profiles = state.root && state.root.getIn(['search', 'searchProfiles'])
  const posts = state.root && state.root.getIn(['search', 'searchPosts'])

  return {
    searchProfilesResults: profiles && profiles.get('profiles').toJS(),
    searchPostsResults: posts && posts.get('posts').toJS(),
    hasNextPageProfiles: profiles && profiles.get('hasNextPage'),
    nextPageIdProfiles: profiles && profiles.get('nextPageId'),
    hasNextPagePosts: posts && posts.get('hasNextPage'),
    nextPageIdPosts: posts && posts.get('nextPageId'),
  }
}

const mapDispatchToProps = dispatch => ({
  requestSearchProfiles(query, pageId) {
    dispatch(requestSearchProfilesAction(query, pageId))
  },

  requestSearchPosts(query, pageId) {
    dispatch(requestSearchPostsAction(query, pageId))
  },

  clearSearchResults() {
    dispatch(clearSearchResultsAction())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage)
