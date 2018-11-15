import { connect } from 'react-redux'

import UserPostListBlock from '../../../components/VisitedUserPage/UserPostListBlock'

import {getVisitedUserPostsAction} from '../../../actions/actions'


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    getVisitedUserPosts(userId, pageId)
    {
        dispatch(getVisitedUserPostsAction(userId, pageId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPostListBlock)
