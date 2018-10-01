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

export function getUserProfile(userId)
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

// getProfileInfo
// { 
//   "success": boolean, 
//   "data": { 
//     "id": "", 
//     "desc": "", 
//     "email": "", 
//     "avatar": "", 
//     "username": "" 
//   } 
// }

export function getProfileInfo() {
  return HTTPErrorHandler(
    fetch(`${url}/profile`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }))
}

export function getUserInfo() {
  return HTTPErrorHandler(
    fetch(`${url}/profile`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }))
}


export function updateProfileInfo({ description, username }) {
  return fetch(`${url}/profile`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ desc: description, username }),
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

