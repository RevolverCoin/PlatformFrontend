import { fromJS, List } from 'immutable'
import moment from 'moment'

function convertTime(time) {
  return moment(time).format('MMMM Do YYYY, h:mm:ss a')
}

export function convertLoginData(data) {
  return fromJS(data)
}

export function convertSignupData(data) {
  return fromJS(data)
}

export function convertMyPosts(data) {

  return {
    hasNextPage: data.hasNextPage,
    nextPageId: data.nextPageId,
    pageId: data.pageId,
    posts: List(data.posts).map(post => (fromJS({
      text: post.text,
      avatar: post.user.avatar,
      username: post.user.username,
      timestamp: post.timestamp,
      likes: post.likes,
      _id: post._id,
    }))),
  }
}

export function convertNewPost(data) {
  return {
    text: data.data.text,
    username: data.data.user.username,
    avatar: data.data.user.avatar,
    timestamp: data.data.timestamp,
    _id: data.data._id,
    userId: data.data.userId,
  }
}


