import { connect } from 'react-redux'

import PostItem from '../components/PostItem'

import {requestLikePostAction} from '../actions/actions'


const mapStateToProps = state => {
    return {
        myId: state && state.root && state.root.getIn(['user','profile','id']), 
    }
}

const mapDispatchToProps = dispatch => ({
    requestLikePost(postId) {
        dispatch(requestLikePostAction(postId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)
