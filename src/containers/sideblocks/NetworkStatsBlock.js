import { connect } from 'react-redux'

import NetworkStatsBlock from '../../components/sideblocks/NetworkStatsBlock'

import {startFetchServiceInfoAction, stopFetchServiceInfoAction} from '../../actions/actions'


const mapStateToProps = (state) => {
  const { root } = state
  const stats = root.hasIn(['stats']) && root.getIn(['stats'])

  return {
    stats: stats && stats.toJS()
  }
}

const mapDispatchToProps = dispatch => ({
  startFetchServiceInfo() {
    dispatch(startFetchServiceInfoAction())
  },
  
  stopFetchServiceInfo() {
    dispatch(stopFetchServiceInfoAction())
  }


})

export default connect(mapStateToProps, mapDispatchToProps)(NetworkStatsBlock)
