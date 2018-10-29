import { push } from 'connected-react-router'
import { fromJS } from 'immutable'
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
  send,
  HTTPErrors,
  getTransactions,
  getRewardTransactions,
  getServiceInfo,
  claimGenerator
} from './../core/api'


let intervalFetchServiceInfo = null
const periodFetchServiceInfo = 5000;



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
      const result = await getUserInfo()
      const userInfo = await result.json()

      return dispatch({
        type: types.GET_USER_INFO_RESULT,
        payload: userInfo,
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
      const response = await requestSearchProfiles(query)
      const data = await response.json()

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
      const response = await requestSearchPosts(query, pageId)
      const data = await response.json()

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
      const response = await getUserPosts(userId, pageId)
      const data = await response.json()

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
      const response = await getVisitedUserInfo(userId)
      const data = await response.json()

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
      const response = await requestSupportedList(userId, pageId)
      const data = await response.json()

      let requests = []
      data.supports.forEach(support => {
        requests.push(getVisitedUserInfoByAddress(support.addressFrom))
      })

      const infos = await promiseChainify(requests)
      const jsonResponses = infos.map(info => info.json())
      const finalResponses = await promiseChainify(jsonResponses)

      const result = finalResponses.map(item => ({ ...item.data }))

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
      const response = await requestSupportingList(userId, pageId)
      const data = await response.json()

      let requests = []
      data.supports.forEach(support => {
        requests.push(getVisitedUserInfoByAddress(support.addressTo))
      })

      const infos = await promiseChainify(requests)
      const jsonResponses = infos.map(info => info.json())
      const finalResponses = await promiseChainify(jsonResponses)

      const result = finalResponses.map(item => ({ ...item.data }))

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
        .then(response => response.json())
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
        let response = await signUp(data)
        let body = await response.json()
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
    return submitPost(data)
      .then(response => response.json())
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

      const response = await getMyPosts(pageId)
      const posts = await response.json()
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
  return dispatch => {
    return updateProfileInfo(data)
      .then(response => {
        return response.json()
      })
      .then(updatedProfile => {
        return dispatch({
          type: types.UPDATE_PROFILE_INFO_ACTION_SUCCESS,
          payload: updatedProfile,
        })
      })
      .catch(error => {
        return handleAPIException(dispatch, error)
      })
  }
}

export function addSupportAction(addressFrom, addressTo) {
  return async dispatch => {
    try {
      const response = await addSupport(addressFrom, addressTo)
      const data = await response.json()

      dispatch({ type: types.ADD_SUPPORT_RESULT, payload: data })
      return data
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }
}

export function removeSupportAction(addressFrom, addressTo) {
  return async dispatch => {
    try {
      const response = await removeSupport(addressFrom, addressTo)
      const data = await response.json()

      dispatch({ type: types.REMOVE_SUPPORT_RESULT, payload: data })
      return data
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
      const result = await getTimelinePosts()
      const data = await result.json()

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
      const result = await getDiscoverPosts()
      const data = await result.json()

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
 * sendAction
 ******************************************************/
export function sendAction(addressFrom, addressTo, amount) {
  return async dispatch => {
    try {
      const result = await send(addressFrom, addressTo, amount)
      const data = await result.json()
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
      const result = await getTransactions()
      const data = await result.json()

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
      const result = await getRewardTransactions()
      const data = await result.json()

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
function getServiceInfoAction()
{
  return async dispatch => {
    try {
      const result = await getServiceInfo()
      const data = await result.json()

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
      type: types.START_FETCH_SERVICE_INFO
    })

    intervalFetchServiceInfo = setInterval(()=>{dispatch(getServiceInfoAction())}, periodFetchServiceInfo)  
    dispatch(getServiceInfoAction()) 
  }
}

export function stopFetchServiceInfoAction() {
  return dispatch => {
    dispatch({
      type: types.STOP_FETCH_SERVICE_INFO
    })
    
    clearInterval (intervalFetchServiceInfo)
  }
}
/****************************************************************************************/


/******************************************************
 * claimGeneratorAction
 ******************************************************/
export function claimGeneratorAction(claim)
{
  return async dispatch => {
    try {
      const result = await claimGenerator(claim)
      const data = await result.json()

      dispatch(getUserInfoAction())
      
    } catch (error) {
      return handleAPIException(dispatch, error)
    }
  }

}

