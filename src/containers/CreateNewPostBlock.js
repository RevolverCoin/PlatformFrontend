import { connect } from 'react-redux'
import { createNewPostAction } from '../actions/actions'

import CreateNewPostBlock from '../components/CreateNewPostBlock'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  createNewPostAction(data) {
    dispatch(createNewPostAction(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPostBlock)
