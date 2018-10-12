import { connect } from 'react-redux'
import { logoutAction } from '../../actions/actions'

import HeaderBlock from '../../components/sideblocks/HeaderBlock'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  logoutAction() {
    dispatch(logoutAction())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBlock)
