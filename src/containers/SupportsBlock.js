import { connect } from 'react-redux'

import SupportsBlock from '../components/SupportsBlock'
import {
  getIncomingSupportsAction,
  getOutgoingSupportsAction,
  createSupportAction,
  claimGeneratorAction,
} from '../actions/actions'

const mapStateToProps = state => {
  const { root } = state
  const supports = root.hasIn(['user', 'supports']) && root.getIn(['user', 'supports'])

  let supportedCount = supports && supports.get('supportedCount')
  if (!supportedCount) supportedCount = 0

  let supportingCount = supports && supports.get('supportingCount')
  if (!supportingCount) supportingCount = 0

  return {
    userSupportedCount: supportedCount,
    userSupportingCount: supportingCount
  }
}

const mapDispatchToProps = dispatch => ({
  getIncomingSupportsAction() {
    dispatch(getIncomingSupportsAction())
  },
  getOutgoingSupportsAction() {
    dispatch(getOutgoingSupportsAction())
  },
  createSupportAction() {
    dispatch(createSupportAction())
  },
  claimGeneratorAction() {
    dispatch(claimGeneratorAction())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupportsBlock)
