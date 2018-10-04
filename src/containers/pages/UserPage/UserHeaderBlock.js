import { connect } from 'react-redux'

import UserHeaderBlock from '../../../components/UserPage/UserHeaderBlock'
import {addSupportAction} from '../../../actions/actions'

const mapStateToProps = state => {

  const profile = state && state.root && state.root.getIn(['user', 'profile'])
  return {
    addressMy: profile && profile.get('address')
  }

}

const mapDispatchToProps = dispatch => ({
    addSupport(addressFrom, addressTo){
        dispatch(addSupportAction(addressFrom, addressTo))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserHeaderBlock)
