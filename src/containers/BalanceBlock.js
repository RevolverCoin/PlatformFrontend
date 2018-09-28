import { connect } from 'react-redux'

import BalanceBlock from '../components/BalanceBlock'
import { sendTokenAction, receiveTokenAction, getTransactionsAction, rewardReportAction } from '../actions/actions'


const mapStateToProps = (state) => {
  const { root } = state
  const balance = root.hasIn(['user', 'balance']) && root.getIn(['user', 'balance'])

  return {
    userBalanceTotal: balance && balance.get('total'),
    userBalanceLocked: balance && balance.get('locked'),
  }
}

const mapDispatchToProps = dispatch => ({
  sendTokenAction() {
    dispatch(sendTokenAction())
  },
  receiveTokenAction() {
    dispatch(receiveTokenAction())
  },
  getTransactionsAction() {
    dispatch(getTransactionsAction())
  },
  rewardReportAction() {
    dispatch(rewardReportAction())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(BalanceBlock)
