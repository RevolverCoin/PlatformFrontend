import { connect } from 'react-redux'
import SignupPage from '../../components/signup'
import { signupAction, clearErrorsAction } from '../../actions/actions'

const mapStateToProps = state => ({
  errorMsg: state.root.getIn(['error', 'msg']),
})

const mapDispatchToProps = dispatch => ({
  signupAction(data) {
    dispatch(signupAction(data))
  },
  clearErrorsAction() {
    dispatch(clearErrorsAction())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)
