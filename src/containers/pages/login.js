import { connect } from 'react-redux'

import LoginPage from '../../components/login'
import { loginAction, clearErrorsAction } from '../../actions/actions'


const mapStateToProps = state => ({
  errorMsg: state.root.getIn(['error', 'msg']),
})

const mapDispatchToProps = dispatch => ({
  loginAction(data) {
    dispatch(loginAction(data))
  },
  clearErrorsAction() {
    dispatch(clearErrorsAction())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
