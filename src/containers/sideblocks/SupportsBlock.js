import { connect } from 'react-redux'

import SupportsBlock from '../../components/sideblocks/SupportsBlock'
import {
  getIncomingSupportsAction,
  getOutgoingSupportsAction,
  createSupportAction,
  claimGeneratorAction,
} from '../../actions/actions'

const mapStateToProps = state => {
  const { root } = state
  const supports = root.hasIn(['user', 'supports']) && root.getIn(['user', 'supports'])

  let supportedCount = supports && supports.get('supported') && supports.get('supported').size
  if (!supportedCount) supportedCount = 0

  let supportingCount = supports && supports.get('supporting') && supports.get('supporting').size
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
