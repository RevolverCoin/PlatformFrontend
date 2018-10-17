import { connect } from 'react-redux'

import ProfileBlock from '../components/ProfileBlock'
import { updateProfileInfoAction } from '../actions/actions'


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  updateProfileInfo(data) {
    return dispatch(updateProfileInfoAction(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBlock)
