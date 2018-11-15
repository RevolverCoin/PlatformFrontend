import * as types from '../constants/ActionType'
import * as core from '../core/core'

export default (state = core.INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN_ACTION:
      return core.handleLogIn(state)
    case types.LOGIN_ACTION_SUCCESS:
      return core.handleLogInSuccess(state, action.payload)
    case types.LOGIN_ACTION_FAILURE:
      return core.handleLogInFailure(state)
    case types.LOGOUT_ACTION:
      return core.handleLogout(state)
    case types.SIGNUP_ACTION:
      return core.handleSignUp(state)
    case types.SIGNUP_ACTION_SUCCESS:
      return core.handleSignUpSuccess(state, action.payload)
    case types.SIGNUP_ACTION_FAILURE:
      return core.handleSignUpFailure(state)
    case types.ERROR_ACTION:
      return core.handleErrorMsg(state, action.payload)
    case types.CLEAR_ERRORS_ACTION:
      return core.handleClearErrorsMsg(state)

    case types.CREATE_NEW_POST_ACTION:
      return core.handleCreateNewPost(state)
    case types.CREATE_NEW_POST_ACTION_SUCCESS:
      return core.handleCreateNewPostSuccess(state, action.payload)
    case types.CREATE_NEW_POST_ACTION_FAILURE:
      return core.handleCreateNewPostFailure(state, action.payload)
    case types.CLEAR_MY_PREV_POSTS_ACTION:
      return core.handleClearMyPrevPostsAction(state)

    case types.GET_MY_POSTS_ACTION:
      return core.handleGetMyPosts(state)
    case types.GET_MY_POSTS_ACTION_SUCCESS:
      return core.handleGetMyPostsSuccess(state, action.payload)
    case types.GET_MY_POSTS_ACTION_FAILURE:
      return core.handleGetMyPostsFailure(state, action.payload)

    case types.GET_USER_INFO_RESULT:
      return core.handleGetUserInfoResult(state, action.payload)
    case types.GET_USER_INFO_ACTION_FAILURE:
      return core.handleGetUserInfoActionFailure(state, action.payload)

    case types.UPDATE_PROFILE_INFO_ACTION_SUCCESS:
      return core.handleUpdateProfileInfoActionSuccess(state, action.payload)
    case types.UPDATE_PROFILE_INFO_ACTION_FAILURE:
      return core.handleUpdateProfileInfoActionFailure(state, action.payload)

    case types.CLEAR_SEARCH_RESULTS:
      return core.handleClearSearchResults(state)

    case types.SEARCH_PROFILES_RESULTS:
      return core.handleSearchProfilesResults(state, action.payload)

    case types.SEARCH_POSTS_RESULTS:
      return core.handleSearchPostsResults(state, action.payload)

    case types.CLEAR_VISITED_USER_POSTS:
      return core.handleClearVisitedUserPosts(state)

    case types.GET_VISITED_USER_POSTS_RESULT:
      return core.handleVisitedUserPostsResults(state, action.payload)

    case types.USER_PROFILE_RESULT:
      return core.handleUserProfileResults(state, action.payload)

    case types.SUPPORTED_LIST_RESULT:
      return core.handleSupportedListResults(state, action.payload)

    case types.SUPPORTING_LIST_RESULT:
      return core.handleSupportingListResults(state, action.payload)

    case types.GET_TIMELINE_POSTS_RESULT:
      return core.handleGetTimelinePostsResults(state, action.payload)
    
    case types.CLEAR_TIMELINE_POSTS:
      return core.handleClearTimelinePosts(state)
      
    case types.CLEAR_DISCOVER_POSTS:
      return core.handleClearDiscoverPosts(state)
    
    case types.GET_DISCOVER_POSTS_RESULT:
      return core.handleGetDiscoverPostsResults(state, action.payload)

    case types.GET_TOP_RATING_RESULT:
      return core.handleGetTopRatingResults(state, action.payload)

    case types.GET_TRANSACTIONS_RESULT:
      return core.handleGetTransactionsResults(state, action.payload)

    case types.GET_REWARD_TRANSACTIONS_RESULT: 
      return core.handleGetRewardTransactionsResults(state, action.payload)
      
    case types.GET_SERVICE_INFO_RESULT:
      return core.handleGetServiceInfoResults(state, action.payload)
    
    case types.LIKE_POST_RESULT: 
      return core.handleLikePostResults(state, action.payload)
      
    default:
      // console.error("Unknown action", action)
      return state
  }
}
