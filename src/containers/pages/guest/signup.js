import { connect } from 'react-redux'
import SignupPage from '../../../components/guest/signup'
import { signupAction, clearErrorsAction } from '../../../actions/actions'

const mapStateToProps = state => {
  return ({
  status: state.root && state.root.getIn(['guest','signUp','status'])
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
