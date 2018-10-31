import { connect } from 'react-redux'

import UserHeaderBlock from '../../../components/VisitedUserPage/UserHeaderBlock'
import {addSupportAction, removeSupportAction} from '../../../actions/actions'

const mapStateToProps = state => {

  const profile = state && state.root && state.root.getIn(['user', 'profile'])

  return {
    addressMy: profile && profile.get('address')
  }

}

const mapDispatchToProps = dispatch => ({
    addSupport(addressFrom, addressTo, userId){
        dispatch(addSupportAction(addressFrom, addressTo, userId))
    },
    removeSupport(addressFrom, addressTo, userId) {
        dispatch(removeSupportAction(addressFrom, addressTo, userId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserHeaderBlock)
