const url = 'http://127.0.0.1:5445'

export const HTTPErrors = {
  Unauthorized: 'Unauthorized'
}

/**  100 posts per page */
const PAGE_SIZE = 100;

/**
 * Wrapper for all HTTP calls that handles HTTP errors and passes as a promise reject 
 */
function HTTPErrorHandler(funcPromise) {
  return new Promise((resolve, reject) => {

    funcPromise.then(response => {
      if (response.status === 401) {

        localStorage.removeItem('isLogged')

        reject(HTTPErrors.Unauthorized);
      } else
        resolve(response);
    })
  })
}

export function getMyPosts(pageId) {
  return HTTPErrorHandler(
    fetch(`${url}/posts/my?pageId=${pageId}&pageSize=${PAGE_SIZE}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }))
}

export function getUserPosts(userId, pageId) {
  return HTTPErrorHandler(
    fetch(`${url}/posts?userId=${userId}&pageId=${pageId}&pageSize=${PAGE_SIZE}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }))
}

export function getVisitedUserInfo(userId)
{
  return HTTPErrorHandler(
    fetch(`${url}/users/${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }))
  
}

export function getVisitedUserInfoByAddress(address)
{
  return HTTPErrorHandler(
    fetch(`${url}/address/${address}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }))
  
}

export function logIn(data) {
  return fetch(`${url}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

// TODO pass to backend only email and confirmPassword for now
export function signUp({
  username, email, password, passwordConfirm,
}) {
  return fetch(`${url}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password: passwordConfirm }),
  })
}

export function logOut() {
  return fetch(`${url}/logout`, {
    method: 'POST',
    credentials: 'include',
  })
}

export function submitPost(text) {
  return fetch(`${url}/post/add`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, expanded: true }),
  })
}

// getUserInfo
// { 
//   "success": boolean, 
//   "profile": { 
//     "id": "", 
//     "desc": "", 
//     "email": "", 
//     "avatar": "", 
//     "username": "" 
//   },
//   supportingCount: 0,
//   supportedCount: 0 
// }

export function getUserInfo() {
  return HTTPErrorHandler(
    fetch(`${url}/info`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }))
}


export function updateProfileInfo({ description, username, avatar }) {

  return fetch(`${url}/profile`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ desc: description, username, avatar }),
  })
}

export function requestSearchProfiles(query) {
  return HTTPErrorHandler(
    fetch(`${url}/profile/search?query=${query}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }))
}

export function requestSearchPosts(query, pageId) {
  return HTTPErrorHandler(
    fetch(`${url}/posts/search?query=${query}&pageId=${pageId}&pageSize=${PAGE_SIZE}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }))
}


export function requestSupportedList(userId, pageId) {
  return HTTPErrorHandler(
    fetch(`${url}/users/${userId}/supported?userId=${userId}&pageId=${pageId}&pageSize=${PAGE_SIZE}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }))
}

export function requestSupportingList(userId, pageId) {
  return HTTPErrorHandler(
    fetch(`${url}/users/${userId}/supporting?userId=${userId}&pageId=${pageId}&pageSize=${PAGE_SIZE}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }))
}

export function addSupport(addressFrom,addressTo) {
  return HTTPErrorHandler(
    fetch(`${url}/support`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({addressFrom,addressTo})
    }))

}

export function removeSupport(addressFrom,addressTo) {
  return HTTPErrorHandler(
    fetch(`${url}/support`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({addressFrom,addressTo})
    }))
}

export function getTimelinePosts() {
  return HTTPErrorHandler(
    fetch(`${url}/timeline`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }))
}

export function getDiscoverPosts() {
  return HTTPErrorHandler(
    fetch(`${url}/discover`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }))
}


export function send(addressFrom,addressTo,amount) {
 
  return HTTPErrorHandler(
    fetch(`${url}/send`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({addressFrom,addressTo,amount})
    }))
}

export function getTransactions()
{
  return HTTPErrorHandler(
    fetch(`${url}/transactions`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    }))
}

export function getRewardTransactions()
{
  return HTTPErrorHandler(
    fetch(`${url}/rewardtransactions`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    }))
}

export function getServiceInfo()
{
  return HTTPErrorHandler(
    fetch(`${url}/service/info`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    }))
} 
