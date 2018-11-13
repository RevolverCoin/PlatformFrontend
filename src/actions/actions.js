import { push } from 'connected-react-router'
import * as types from '../constants/ActionType'
import emailRegExp, { promiseChainify } from '../utils/misc'
import {
  convertLoginData,
  convertMyPosts,
  convertNewPost,
  convertSignupData,
} from './../core/convert'
import {
  getMyPosts,
  logIn,
  logOut,
  signUp,
  submitPost,
  getUserInfo,
  updateProfileInfo,
  requestSearchProfiles,
  requestSearchPosts,
  getUserPosts,
  getVisitedUserInfo,
  getVisitedUserInfoByAddress,
  requestSupportedList,
  requestSupportingList,
  addSupport,
  removeSupport,
  getTimelinePosts,
  getDiscoverPosts,
  getTopRating,
  send,
  HTTPErrors,
  getTransactions,
  getRewardTransactions,
  getServiceInfo,
  claimGenerator,
} from './../core/api'

let intervalFetchServiceInfo = null
const periodFetchServiceInfo = 5000

function handleAPIException(dispatch, error, type) {
  if (error === HTTPErrors.Unauthorized) {
    dispatch(push('/login'))
  }

  let actionType = type
  if (typeof type === 'undefined') {
    actionType = types.API_CALL_FAILURE
  }

  dispatch({ type: actionType, payload: error })

  return error
}

/**
 * getUserInfoAction
 */
export function getUserInfoAction() {
  return async dispatch => {
    try {
      const data = await getUserInfo()

      return dispatch({
        type: types.GET_USER_INFO_RESULT,
        payload: data,
      })
    } catch (error) {
      return handleAPIException(dispatch, error, types.GET_USER_INFO_ACTION_FAILURE)
    }
  }
}

/**
 * requestSearchProfilesAction
 */
export function requestSearchProfilesAction(query) {
  return async dispatch => {
    try {
      const data = await requestSearchProfiles(query)

      dispatch({ type: types.SEARCH_PROFILES_RESULTS, payload: data })
      return data
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

/**
 * requestPostsSearchAction
 */
export function requestSearchPostsAction(query, pageId) {
  return async dispatch => {
    try {
      const data = await requestSearchPosts(query, pageId)

      dispatch({ type: types.SEARCH_POSTS_RESULTS, payload: data })
      return data
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

export function getUserPostsAction(userId, pageId) {
  return async dispatch => {
    try {
      const data = await getUserPosts(userId, pageId)

      dispatch({ type: types.USER_POSTS_RESULT, payload: data })
      return data
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

/**
 * get info for some user (userId)
 */
export function getVisitedUserInfoAction(userId) {
  return async dispatch => {
    try {
      const data = await getVisitedUserInfo(userId)

      dispatch({ type: types.USER_PROFILE_RESULT, payload: data })
      return data
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

export function requestSupportedListAction(userId, pageId) {
  return async dispatch => {
    try {
      const data = await requestSupportedList(userId, pageId)

      let requests = []
      data.supports.forEach(support => {
        requests.push(getVisitedUserInfoByAddress(support.addressFrom))
      })

      const responses = await promiseChainify(requests)  
      const result = responses.map(item => ({ ...item.data }))

      dispatch({ type: types.SUPPORTED_LIST_RESULT, payload: result })
      return data
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

export function requestSupportingListAction(userId, pageId) {
  return async dispatch => {
    try {
      const data = await requestSupportingList(userId, pageId)

      let requests = []
      data.supports.forEach(support => {
        requests.push(getVisitedUserInfoByAddress(support.addressTo))
      })

      const responses = await promiseChainify(requests)
      const result = responses.map(item => ({ ...item.data }))

      dispatch({ type: types.SUPPORTING_LIST_RESULT, payload: result })
      return data
    } catch (error) {
      console.log(error)
      return handleAPIException(dispatch, error)
    }
  }
}

/**
 * Login action
 */

export function loginAction(data) {
  let result = { type: types.LOGIN_ACTION, data }
  if (data.email === '' || data.password === '') {
    result = { type: types.ERROR_ACTION, payload: 'All fields must not be empty!' }
  } else if (!emailRegExp.test(data.email)) {
    result = { type: types.ERROR_ACTION, payload: 'Email is not valid!' }
  } else {
    return dispatch => {
      dispatch({ type: types.LOGIN_ACTION })

      return logIn(data)
        .then(body => {
          const converted = convertLoginData(body)

          dispatch({ type: types.LOGIN_ACTION_SUCCESS, payload: converted })

          localStorage.setItem('isLogged', true)
          dispatch(push('/'))
        })
        .catch(err => {
          console.log(err)
          dispatch({ type: types.LOGIN_ACTION_FAILURE })
        })
    }
  }
  return result
}

export function logoutAction() {
  return dispatch =>
    logOut()
      .then(() => {
        dispatch({ type: types.LOGOUT_ACTION })
        localStorage.removeItem('isLogged')
        dispatch(push('/'))
      })
      .catch(err => {
        console.log(err)
        dispatch(push('/'))
      })
}

export function signupAction(data) {

  let result = { type: types.SIGNUP_ACTION, data }
  if (
    data.username === '' ||
    data.email === '' ||
    data.password === '' ||
    data.passwordConfirm === ''
  ) {
    result = { type: types.ERROR_ACTION, payload: 'All fields must not be empty!' }
  } else if (!emailRegExp.test(data.email)) {
    result = { type: types.ERROR_ACTION, payload: 'Email is not valid!' }
  } else if (data.password !== data.passwordConfirm) {
    result = { type: types.ERROR_ACTION, payload: 'Passwords are not equal!' }
  } else {
    return async dispatch => {
      try {
        await dispatch({ type: types.SIGNUP_ACTION })
        const body      = await signUp(data)

        const converted = convertSignupData(body)

        await dispatch({ type: types.SIGNUP_ACTION_SUCCESS, payload: converted })

        localStorage.setItem('isLogged', true)
        dispatch(push('/'))
        dispatch(getUserInfoAction())
      } catch (error) {
        return handleAPIException(dispatch, error, types.SIGNUP_ACTION_FAILURE)
      }
    }
  }
  return result
}

export function clearErrorsAction() {
  return { type: types.CLEAR_ERRORS_ACTION }
}

export function getIncomingSupportsAction() {
  return { type: types.GET_INCOMING_SUPPORTS_ACTION }
}

export function getOutgoingSupportsAction() {
  return { type: types.GET_OUTGOING_SUPPORTS_ACTION }
}

export function createSupportAction() {
  return { type: types.CREATE_SUPPORT_ACTION }
}

export function sendTokenAction() {
  return { type: types.SEND_TOKEN_ACTION }
}

export function receiveTokenAction() {
  return { type: types.RECEIVE_TOKEN_ACTION }
}

export function getTransactionsAction() {
  return { type: types.GET_TRANSACTIONS_ACTION }
}

export function rewardReportAction() {
  return { type: types.REWARD_REPORT_ACTION }
}

export function createNewPostAction(data) {
  return dispatch => {
    dispatch({ type: types.CREATE_NEW_POST_ACTION })

    return submitPost(data.hexEncode())
      .then(post => {
        const converted = convertNewPost(post)
        return dispatch({
          type: types.CREATE_NEW_POST_ACTION_SUCCESS,
          payload: converted,
        })
      })
      .catch(err => dispatch({ type: types.CREATE_NEW_POST_ACTION_FAILURE, payload: err }))
  }
}

export function getMyPostsAction(pageId) {
  return async dispatch => {
    try {
      dispatch({ type: types.GET_MY_POSTS_ACTION })

      const posts = await getMyPosts(pageId)
      if (posts.data) {
        const converted = convertMyPosts(posts.data)

        dispatch({
          type: types.GET_MY_POSTS_ACTION_SUCCESS,
          payload: converted,
        })
      } else {
        // TODO: in case there is no posts - do not send FAILURE
        dispatch({ type: types.GET_MY_POSTS_ACTION_FAILURE, payload: null })
      }
    } catch (err) {
      if (err === HTTPErrors.Unauthorized) {
        dispatch(push('/login'))
      }

      dispatch({ type: types.GET_MY_POSTS_ACTION_FAILURE, payload: err })
    }
  }
}

export function clearMyPrevPostsAction() {
  return dispatch => {
    dispatch({ type: types.CLEAR_MY_PREV_POSTS_ACTION })
  }
}

export function updateProfileInfoAction(data) {
  return async dispatch => {
    try {
      
      const updatedProfile = await updateProfileInfo(data)

      return dispatch({
        type: types.UPDATE_PROFILE_INFO_ACTION_SUCCESS,
        payload: updatedProfile,
      })
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

export function addSupportAction(addressFrom, addressTo, userId) {
  return async dispatch => {
    try {
      const data = await addSupport(addressFrom, addressTo)

      await dispatch({ type: types.ADD_SUPPORT_RESULT, payload: data })
      await dispatch(getUserInfoAction())
      await dispatch(getVisitedUserInfoAction(userId))
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

export function removeSupportAction(addressFrom, addressTo, userId) {
  return async dispatch => {
    try {
      const data = await removeSupport(addressFrom, addressTo)

      await dispatch({ type: types.REMOVE_SUPPORT_RESULT, payload: data })
      await dispatch(getUserInfoAction())
      await dispatch(getVisitedUserInfoAction(userId))
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

/******************************************************
 * requestTimelinePostsAction
 ******************************************************/
export function requestTimelinePostsAction() {
  return async dispatch => {
    try {
      const data = await getTimelinePosts()

      return dispatch({
        type: types.GET_TIMELINE_POSTS_RESULT,
        payload: data,
      })
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

/******************************************************
 * requestDiscoverPostsAction
 ******************************************************/
export function requestDiscoverPostsAction() {
  return async dispatch => {
    try {
      const data = await getDiscoverPosts()

      return dispatch({
        type: types.GET_DISCOVER_POSTS_RESULT,
        payload: data,
      })
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

/******************************************************
 * requestTopRatingAction
 ******************************************************/
export function requestTopRatingAction() {
  return async dispatch => {
    try {
      const data = await getTopRating()

      return dispatch({
        type: types.GET_TOP_RATING_RESULT,
        payload: data,
      })
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

/******************************************************
 * sendAction
 ******************************************************/
export function sendAction(addressFrom, addressTo, amount) {
  return async dispatch => {
    try {
      const data = await send(addressFrom, addressTo, amount)
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

/******************************************************
 * requestTransactionsAction
 ******************************************************/
export function requestTransactionsAction() {
  return async dispatch => {
    try {
      const data = await getTransactions()

      return dispatch({
        type: types.GET_TRANSACTIONS_RESULT,
        payload: data,
      })
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

/******************************************************
 * requestRewardTransactionsAction
 ******************************************************/
export function requestRewardTransactionsAction() {
  return async dispatch => {
    try {
      const data = await getRewardTransactions()

      return dispatch({
        type: types.GET_REWARD_TRANSACTIONS_RESULT,
        payload: data,
      })
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

/****************************************************************************************
 * Fetch Service Info
 ****************************************************************************************/
function getServiceInfoAction() {
  return async dispatch => {
    try {
      const data = await getServiceInfo()

      return dispatch({
        type: types.GET_SERVICE_INFO_RESULT,
        payload: data,
      })
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

export function startFetchServiceInfoAction() {
  return async dispatch => {
    dispatch({
      type: types.START_FETCH_SERVICE_INFO,
    })

    intervalFetchServiceInfo = setInterval(() => {
      dispatch(getServiceInfoAction())
    }, periodFetchServiceInfo)
    dispatch(getServiceInfoAction())
  }
}

export function stopFetchServiceInfoAction() {
  return dispatch => {
    dispatch({
      type: types.STOP_FETCH_SERVICE_INFO,
    })

    clearInterval(intervalFetchServiceInfo)
  }
}
/****************************************************************************************/

/******************************************************
 * claimGeneratorAction
 ******************************************************/
export function claimGeneratorAction(claim) {
  return async dispatch => {
    try {
      const data = await claimGenerator(claim)

      dispatch(getUserInfoAction())
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

/******************************************************
 * getUserInfoByAddressAction
 ******************************************************/
export function getUserInfoByAddressAction(address) {
  return async dispatch => {
    try {
      const data = await getVisitedUserInfoByAddress(address)

      dispatch(push(`/posts/${data.data.profile.id}`))
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}
