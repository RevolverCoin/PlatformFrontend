import { connect } from 'react-redux'
import SignupPage from '../../../components/guest/signup'
import { signupAction, clearErrorsAction } from '../../../actions/actions'

const mapStateToProps = state => {
  return ({
  errorMsg: state.root && state.root.getIn(['error', 'msg']),
})}

const mapDispatchToProps = dispatch => ({
  signupAction(data) {
    dispatch(signupAction(data))
  },
  clearErrorsAction() {
    dispatch(clearErrorsAction())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)
