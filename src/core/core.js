import { fromJS, List } from 'immutable'

export const INITIAL_STATE = fromJS({
  error: {
    msg: null,
  },
  stats: {
    authors: null,
    supporters: null,
    generator: null,
  },
  user: {
    supports: {
      supported: null,
      supporting: null
    },
    balance: {
      total: 0,
      locked: 0,
    },
    profile: {
      id: null,
      avatar: null,
      username: null,
      description: null,
      email: null,
      address: null,
  
      // flag to show loading during logging in
      isLoading: false,
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
      postsList: List([]),
    }
  },
  current: {
    userProfile: {},
    searchProfiles: null,
    searchPosts: null,
    posts: null,
    supports: {},
    supportList: null,
    data: null
  }


})

export function handleLogIn(state) {
  return state.setIn(['user', 'profile', 'isLoading'], true)
}

export function handleLogInSuccess(state, data) {
  return state.setIn(['user', 'profile', 'isLogged'], data.get('success'))
    .setIn(['user', 'profile', 'isLoading'], false)
}

export function handleLogInFailure(state) {
  return state.setIn(['user', 'profile', 'isLoading'], false)
    .setIn(['error', 'msg'], 'Current user does not exist')
}

export function handleSignUp(state) {
  return state.setIn(['user', 'profile', 'isLoading'], true)
}

export function handleSignUpSuccess(state, data) {
  return state.setIn(['user', 'profile', 'isLogged'], data.get('success'))
    .setIn(['user', 'profile', 'id'], data.getIn(['data', 'id']))
    .setIn(['user', 'profile', 'isLoading'], false)
}

export function handleSignUpFailure(state) {
  return state.setIn(['user', 'profile', 'isLoading'], false)
    .setIn(['error', 'msg'], 'Server does not respond or this user already exists, try again')
}

export function handleLogout() {
  return INITIAL_STATE
}

export function handleErrorMsg(state, data) {
  return state.set(['error', 'msg'], fromJS(data))
}

export function handleClearErrorsMsg(state) {
  return state.setIn(['error', 'msg'], null)
}

export function handleCreateNewPost(state) {
  return state.setIn(['user', 'posts', 'fetchingNewPost'], true)
}

export function handleCreateNewPostSuccess(state, data) {
  return state.updateIn(['user', 'posts', 'postsList'], posts => posts.unshift(data))
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
  return state.updateIn(['user', 'posts', 'postsList'], posts => posts.concat(data.posts))
    .setIn(['user', 'posts', 'fetchingPosts'], false)
    .setIn(['user', 'posts', 'hasNextPage'], data.hasNextPage)
    .setIn(['user', 'posts', 'nextPageId'], data.nextPageId)
    .deleteIn(['user', 'posts', 'error'])
}

export function handleGetMyPostsFailure(state, data) {
  return state.setIn(['user', 'posts', 'error'], data)
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

  return state.updateIn(['user', 'profile'], info => info.merge(fromJS(data.data.profile)))
        .setIn(['user', 'profile', 'description'], fromJS(data.data.profile.desc))
        .setIn(['user','supports'], fromJS(data.data.supports))
        .setIn(['user','balance','total'], fromJS(data.data.balance))
}

export function handleGetUserInfoActionFailure(state, err) {
  return state.setIn(['error', 'msg'], `Unable to get profile info, ${err}`)
}

export function handleUpdateProfileInfoActionSuccess(state, data) {

  return state.updateIn(['user', 'profile'], info => info.merge(fromJS(data.profile)))
        .setIn(['user', 'profile', 'description'], fromJS(data.profile.desc))
}

export function handleUpdateProfileInfoActionFailure(state, err) {
  return state.setIn(['error', 'msg'], `Cannot update profile info, ${err}`)
}

export function handleSearchProfilesResults(state, data)
{
  return state.setIn(['current','searchProfiles'], fromJS(data.data))
} 
export function handleSearchPostsResults(state, data)
{
  return state.setIn(['current','searchPosts'], fromJS(data.data))
}

export function handleUserPostsResults(state, data)
{
  return state.setIn(['current','posts'], fromJS(data.data))
}

export function handleUserProfileResults(state, data)
{
  return state.setIn(['current','userProfile'], fromJS(data.data.profile))
         .setIn(['current','supports'], fromJS(data.data.supports))
}

export function handleSupportedListResults(state, data)
{
  return state.setIn(['current','supportList'], fromJS(data))
}

export function handleSupportingListResults(state, data)
{
  return state.setIn(['current','supportList'], fromJS(data))
}

/*
* id 
* text
* timestamp
*/
export function handleGetTimelinePostsResults(state, data)
{
  return state.setIn(['current', 'posts'], fromJS(data.data))
}

export function handleGetDiscoverPostsResults(state, data)
{
  return state.setIn(['current', 'posts'], fromJS(data.data))
}

export function handleGetTransactionsResults(state, data)
{
  return state.setIn(['current', 'data'], fromJS(data.data))
}