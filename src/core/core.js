import { fromJS, List } from 'immutable'

export const INITIAL_STATE = fromJS({
  global: {
    apiCallLoading: false
  },
  error: {
    msg: null,
  },
  guest: {
    forgotPassword: {
      // can be [null, 'success', 'failed']
      status: null  
    }
  },
  stats: {
    blockHeight: null,
    lastBlockTime: null,
    currentTime: null,
    users: null,
    supports: null,
    supporting: null,
    supported: null,
    generators: null,
  },
  user: {
    supports: {
      supported: null,
      supporting: null,
    },
    balance: {
      total: 0,
      locked: 0,
    },
    type: null,
    profile: {
      id: null,
      avatar: null,
      username: null,
      description: null,
      email: null,
      address: null,
      website: null,
      links: [],

      // flag to store success auth
      isLogged: false,
    },
    posts: {
      // handle loader when new post creates
      fetchingNewPost: false,
      // handle loader for the old posts
      fetchingPosts: false,
      error: null,
      hasNextPage: false,
      nextPageId: null,
      postsList: List(),
    },
  },
  rewards: {
    data: null,
  },
  timeline: {
    posts: [],
    hasNextPage: false,
    nextPageId: 1,    
  },
  discover: {
    posts: [],
    hasNextPage: false,
    nextPageId: 1,
  },
  top: {
    data: null,
  },
  visitedUser: {
    posts: {
      posts: [],
      hasNextPage: false,
      nextPageId: 1,
    },
    profile: {},
    supports: {},
  },
  search: {
    searchProfiles: {
      profiles: [],
      hasNextPage: false,
      nextPageId: 1,
    },
    searchPosts: {
      posts: [],
      hasNextPage: false,
      nextPageId: 1,
    },
  },
  current: {
    supports: {},
    supportList: null,
    data: null,
  },
})

export function handleApiCallStartLoading(state) {
  return state.setIn(['global', 'apiCallLoading'], true)
}
export function handleApiCallStopLoading(state) {
  return state.setIn(['global', 'apiCallLoading'], false)
}


export function handleLogInSuccess(state, data) {
  return state
    .setIn(['user', 'profile', 'isLogged'], data.get('success'))
}

export function handleLogInFailure(state) {
  return state
    .setIn(['error', 'msg'], 'Current user does not exist')
}



export function handleSignUpSuccess(state, data) {
  return state
    .setIn(['user', 'profile', 'isLogged'], data.get('success'))
    .setIn(['user', 'profile', 'id'], data.getIn(['data', 'id']))
}

export function handleSignUpFailure(state) {
  return state
    .setIn(['error', 'msg'], 'Server does not respond or this user already exists, try again')
}

export function handleLogout() {
  return INITIAL_STATE
}

export function handleRequestForgotPasswordSuccess(state)
{
  return state.setIn(['guest', 'forgotPassword', 'status'], 'success')
}

export function handleRequestForgotPasswordFailure(state)
{
  return state.setIn(['guest', 'forgotPassword', 'status'], 'failure')
}
export function handleClearForgotPasswordStatus(state)
{
  return state.setIn(['guest', 'forgotPassword', 'status'], null)
}

export function handleErrorMsg(state, data) {
  return state.setIn(['error', 'msg'], fromJS(data))
}

export function handleClearErrorsMsg(state) {
  return state.setIn(['error', 'msg'], null)
}

export function handleCreateNewPost(state) {
  return state.setIn(['user', 'posts', 'fetchingNewPost'], true)
}

export function handleCreateNewPostSuccess(state, data) {
  return state
    .updateIn(['user', 'posts', 'postsList'], posts => posts.unshift(data))
    .setIn(['user', 'posts', 'fetchingNewPost'], false)
    .deleteIn(['user', 'posts', 'error'])
}

export function handleCreateNewPostFailure(state, data) {
  return state.setIn(['user', 'posts', 'error'], data)
}

export function handleGetMyPosts(state) {
  return state.setIn(['user', 'posts', 'fetchingPosts'], true)
}

export function handleGetMyPostsSuccess(state, data) {
  return state
    .updateIn(['user', 'posts', 'postsList'], posts => posts.concat(data.posts))
    .setIn(['user', 'posts', 'fetchingPosts'], false)
    .setIn(['user', 'posts', 'hasNextPage'], data.hasNextPage)
    .setIn(['user', 'posts', 'nextPageId'], data.nextPageId)
    .deleteIn(['user', 'posts', 'error'])
}

export function handleGetMyPostsFailure(state, data) {
  return state
    .setIn(['user', 'posts', 'error'], data)
    .setIn(['user', 'posts', 'fetchingPosts'], false)
}

export function handleClearMyPrevPostsAction(state) {
  return state.setIn(['user', 'posts', 'postsList'], List([]))
}

/**
 * data = {
    success,
    profile,
    supports,
    balance }  
 */
export function handleGetUserInfoResult(state, data) {
  return state
    .updateIn(['user', 'profile'], info => info.merge(fromJS(data.data.profile)))
    .setIn(['user', 'profile', 'description'], fromJS(data.data.profile.desc))
    .setIn(['user', 'supports'], fromJS(data.data.supports))
    .setIn(['user', 'balance', 'total'], fromJS(data.data.balance))
    .setIn(['user', 'balance', 'locked'], fromJS(data.data.lockedBalance))
    .setIn(['user', 'type'], fromJS(data.data.type))
}

export function handleGetUserInfoActionFailure(state, err) {
  return state.setIn(['error', 'msg'], `Unable to get profile info, ${err}`)
}

export function handleUpdateProfileInfoActionSuccess(state, data) {
  return state
    .updateIn(['user', 'profile'], info => info.merge(fromJS(data.profile)))
    .setIn(['user', 'profile', 'description'], fromJS(data.profile.desc))
}

export function handleUpdateProfileInfoActionFailure(state, err) {
  return state.setIn(['error', 'msg'], `Cannot update profile info, ${err}`)
}

export function handleClearSearchResults(state) {
  return state
    .setIn(['search', 'searchProfiles', 'profiles'], List())
    .setIn(['search', 'searchPosts', 'posts'], List())
}

export function handleSearchProfilesResults(state, data) {
  return state
    .updateIn(['search', 'searchProfiles', 'profiles'], profiles => profiles.concat(fromJS(data.data.users)))
    .setIn(['search', 'searchProfiles', 'hasNextPage'], data.data.hasNextPage)
    .setIn(['search', 'searchProfiles', 'nextPageId'], data.data.nextPageId)

  
}
export function handleSearchPostsResults(state, data) {
  return state
    .updateIn(['search', 'searchPosts', 'posts'], posts => posts.concat(fromJS(data.data.posts)))
    .setIn(['search', 'searchPosts', 'hasNextPage'], data.data.hasNextPage)
    .setIn(['search', 'searchPosts', 'nextPageId'], data.data.nextPageId)
}

export function handleClearVisitedUserPosts(state) {
  return state.setIn(['visitedUser', 'posts', 'posts'], List())
}

export function handleVisitedUserPostsResults(state, data) {
  return state
    .updateIn(['visitedUser', 'posts', 'posts'], posts => posts.concat(fromJS(data.data.posts)))
    .setIn(['visitedUser', 'posts', 'hasNextPage'], data.data.hasNextPage)
    .setIn(['visitedUser', 'posts', 'nextPageId'], data.data.nextPageId)
}

export function handleUserProfileResults(state, data) {
  return state
    .setIn(['visitedUser', 'profile'], fromJS(data.data.profile))
    .setIn(['visitedUser', 'supports'], fromJS(data.data.supports))
}

export function handleSupportedListResults(state, data) {
  return state.setIn(['current', 'supportList'], fromJS(data))
}

export function handleSupportingListResults(state, data) {
  return state.setIn(['current', 'supportList'], fromJS(data))
}

export function handleClearTimelinePosts(state) {
  return state.setIn(['timeline', 'posts'], List())
}

export function handleGetTimelinePostsResults(state, data) {
  return state
    .updateIn(['timeline', 'posts'], posts => posts.concat(fromJS(data.data.posts)))
    .setIn(['timeline', 'hasNextPage'], data.data.hasNextPage)
    .setIn(['timeline', 'nextPageId'], data.data.nextPageId)
}

export function handleClearDiscoverPosts(state) {
  return state.setIn(['discover', 'posts'], List())
}

export function handleGetDiscoverPostsResults(state, data) {
  return state
    .updateIn(['discover', 'posts'], posts => posts.concat(fromJS(data.data.posts)))
    .setIn(['discover', 'hasNextPage'], data.data.hasNextPage)
    .setIn(['discover', 'nextPageId'], data.data.nextPageId)
}

export function handleGetTopRatingResults(state, data) {
  return state.setIn(['top', 'data'], fromJS(data.data))
}

export function handleGetTransactionsResults(state, data) {
  return state.setIn(['current', 'data'], fromJS(data.data))
}

export function handleGetRewardTransactionsResults(state, data) {
  return state.setIn(['rewards', 'data'], fromJS(data.data))
}

export function handleGetServiceInfoResults(state, data) {
  const info = {
    blockHeight: data.data.blockHeight,
    lastBlockTime: data.data.lastBlockTime,
    currentTime: data.data.currentTime,
    users: data.data.addresses,
    supports: data.data.supports,
    supporting: data.data.sing,
    supported: data.data.sed,
    generators: data.data.generators,
  }

  return state.set('stats', fromJS(info))
}

/**
 * Update all posts with data._id and update likes info from data.likes
 * @param {*} state
 * @param {*} data
 */
export function handleLikePostResults(state, data) {
  const updatePosts = posts => {
    // find index of posts that we want to update
    const index = posts.findIndex(item => item.get('_id') === data._id)

    // update likes if post was found
    return index < 0 ? posts : posts.setIn([index, 'likes'], data.likes)
  }

  // update all posts branches in redux tree
  return state
    .updateIn(['timeline', 'posts'], updatePosts)
    .updateIn(['discover', 'posts'], updatePosts)
    .updateIn(['visitedUser', 'posts', 'posts'], updatePosts)
    .updateIn(['search', 'searchPosts', 'posts'], updatePosts)
}
