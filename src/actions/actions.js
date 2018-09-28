import { push } from 'connected-react-router'
import * as types from '../constants/ActionType'
import emailRegExp from '../utils/misc'
import { convertLoginData, convertMyPosts, convertNewPost, convertSignupData, convertProfileInfo, convertUpdatedProfileInfo } from './../core/convert'
import { 
  getMyPosts, 
  logIn, 
  logOut, 
  signUp, 
  submitPost, 
  getProfileInfo, 
  updateProfileInfo,
  requestSearchProfiles,
  requestSearchPosts,
  getUserPosts,
  getUserProfile,
  requestSupportedList,
  requestSupportingList,
  HTTPErrors } from './../core/api'


/**
 * getProfileInfoAction
 */
export function getProfileInfoAction() {
  return (dispatch) => {
    dispatch({ type: types.GET_PROFILE_INFO_ACTION })

    return getProfileInfo().then((response) => {
      return response.json()
    }).then((profile) => {
      const converted = convertProfileInfo(profile.data)
      return dispatch({
        type: types.GET_PROFILE_INFO_ACTION_SUCCESS,
        payload: converted,
      })
    }).catch(err => {

      if (err === HTTPErrors.Unauthorized) {
        dispatch(push('/login'));
      }

      dispatch({ type: types.GET_PROFILE_INFO_ACTION_FAILURE, payload: err })
    })
  }
}

/**
 * requestSearchProfilesAction
 */
export function requestSearchProfilesAction(query) {
  return async dispatch => {
    try {
      const response  = await requestSearchProfiles(query)
      const data      = await response.json(); 
      
      dispatch({ type: types.SEARCH_PROFILES_RESULTS, payload: data });      
      return data;

    } catch (error) {
      
      if (error === HTTPErrors.Unauthorized) {
        dispatch(push('/login'));
      }

      dispatch({ type: types.API_CALL_FAILURE, error });
      return error;
    }    
  }
}

/**
 * requestPostsSearchAction
 */
export function requestSearchPostsAction(query, pageId) {
  return async dispatch => {
    try {
      const response  = await requestSearchPosts(query, pageId)
      const data      = await response.json(); 
      
      dispatch({ type: types.SEARCH_POSTS_RESULTS, payload: data });      
      return data;

    } catch (error) {
      
      if (error === HTTPErrors.Unauthorized) {
        dispatch(push('/login'));
      }

      dispatch({ type: types.API_CALL_FAILURE, error });
      return error;
    }    
  }
}



export function getUserPostsAction(userId, pageId)
{
  return async dispatch => {
    try {
      const response  = await getUserPosts(userId, pageId)
      const data      = await response.json(); 
      
      dispatch({ type: types.USER_POSTS_RESULT, payload: data });      
      return data;

    } catch (error) {
      
      if (error === HTTPErrors.Unauthorized) {
        dispatch(push('/login'));
      }

      dispatch({ type: types.API_CALL_FAILURE, error });
      return error;
    }    
    
  }
}

export function getUserProfileAction(userId)
{
  return async dispatch => {
    try {
      const response  = await getUserProfile(userId)
      const data      = await response.json(); 
      
      dispatch({ type: types.USER_PROFILE_RESULT, payload: data });      
      return data;

    } catch (error) {
      
      if (error === HTTPErrors.Unauthorized) {
        dispatch(push('/login'));
      }

      dispatch({ type: types.API_CALL_FAILURE, error });
      return error;
    }    
    
  }  
}

export function requestSupportedListAction(userId, pageId)
{
  return async dispatch => {
    try {
      const response  = await requestSupportedList(userId, pageId)
      const data      = await response.json(); 
      
      dispatch({ type: types.SUPPORTED_LIST_RESULT, payload: data });      
      return data;

    } catch (error) {
      
      if (error === HTTPErrors.Unauthorized) {
        dispatch(push('/login'));
      }

      dispatch({ type: types.API_CALL_FAILURE, error });
      return error;
    }    
    
  }  
}

export function requestSupportingListAction(userId, pageId)
{
  return async dispatch => {
    try {
      const response  = await requestSupportingList(userId, pageId)
      const data      = await response.json(); 
      
      dispatch({ type: types.SUPPORTING_LIST_RESULT, payload: data });      
      return data;

    } catch (error) {
      
      if (error === HTTPErrors.Unauthorized) {
        dispatch(push('/login'));
      }

      dispatch({ type: types.API_CALL_FAILURE, error });
      return error;
    }    
    
  }  
}




export function loginAction(data) {
  let result = { type: types.LOGIN_ACTION, data }
  if (data.email === '' || data.password === '') {
    result = { type: types.ERROR_ACTION, payload: 'All fields must not be empty!' }
  } else if (!emailRegExp.test(data.email)) {
    result = { type: types.ERROR_ACTION, payload: 'Email is not valid!' }
  } else {
    return (dispatch) => {
      dispatch({ type: types.LOGIN_ACTION })
      return logIn(data).then(response => response.json())
        .then((body) => {
          const converted = convertLoginData(body)
          dispatch({ type: types.LOGIN_ACTION_SUCCESS, payload: converted })
          dispatch(getProfileInfoAction())
          localStorage.setItem('isLogged', true)
          dispatch(push('/'))
        })
        .catch((err) => {
          console.log(err)
          dispatch({ type: types.LOGIN_ACTION_FAILURE })
        })
    }
  }
  return result
}

export function logoutAction() {
  return dispatch => logOut().then(() => {
    dispatch({ type: types.LOGOUT_ACTION })
    localStorage.removeItem('isLogged')
    dispatch(push('/'))
  })
    .catch((err) => {
      console.log(err)
      dispatch(push('/'))
    })
}

export function signupAction(data) {
  let result = { type: types.SIGNUP_ACTION, data }
  if (data.username === '' || data.email === '' || data.password === '' || data.passwordConfirm === '') {
    result = { type: types.ERROR_ACTION, payload: 'All fields must not be empty!' }
  } else if (!emailRegExp.test(data.email)) {
    result = { type: types.ERROR_ACTION, payload: 'Email is not valid!' }
  } else if (data.password !== data.passwordConfirm) {
    result = { type: types.ERROR_ACTION, payload: 'Passwords are not equal!' }
  } else {
    return (dispatch) => {
      dispatch({ type: types.SIGNUP_ACTION })
      return signUp(data).then(response => response.json())
        .then((body) => {
          const converted = convertSignupData(body)
          dispatch({ type: types.SIGNUP_ACTION_SUCCESS, payload: converted })
          localStorage.setItem('isLogged', true)
          dispatch(push('/'))
        })
        .catch((err) => {
          console.log(err)
          dispatch({ type: types.SIGNUP_ACTION_FAILURE })
        })
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

export function claimGeneratorAction() {
  return { type: types.CLAIM_GENERATOR_ACTION }
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
  return (dispatch) => {
    dispatch({ type: types.CREATE_NEW_POST_ACTION })
    return submitPost(data)
      .then(response => response.json())
      .then((post) => {
        const converted = convertNewPost(post)
        return dispatch({
          type: types.CREATE_NEW_POST_ACTION_SUCCESS,
          payload: converted,
        })
      }).catch(err => dispatch({ type: types.CREATE_NEW_POST_ACTION_FAILURE, payload: err }))
  }
}

export function getMyPostsAction(pageId) {
  return (dispatch) => {
    dispatch({ type: types.GET_MY_POSTS_ACTION })
    return getMyPosts(pageId).then((response) => {
      return response.json()
    }).then((posts) => {
      const converted = convertMyPosts(posts.data)
      return dispatch({
        type: types.GET_MY_POSTS_ACTION_SUCCESS,
        payload: converted,
      })
    }).catch(err => {
      if (err === HTTPErrors.Unauthorized) {
        dispatch(push('/login'));
      }

      dispatch({ type: types.GET_MY_POSTS_ACTION_FAILURE, payload: err })
    })
  }
}

export function clearMyPrevPostsAction() {
  return (dispatch) => {
    dispatch({ type: types.CLEAR_MY_PREV_POSTS_ACTION })
  }
}

export function updateProfileInfoAction(data) {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_PROFILE_INFO_ACTION })
    return updateProfileInfo(data).then((response) => {
      return response.json()
    }).then((updatedProfile) => {
      const converted = convertUpdatedProfileInfo(updatedProfile)
      return dispatch({
        type: types.UPDATE_PROFILE_INFO_ACTION_SUCCESS,
        payload: converted,
      })
    }).catch(err => {

      if (err === HTTPErrors.Unauthorized) {
        dispatch(push('/login'));
      }

      dispatch({ type: types.UPDATE_PROFILE_INFO_ACTION_FAILURE, payload: err })
    })
  }
}


