import React from 'react'
import { Link } from 'react-router-dom'
import Panel from 'muicss/lib/react/panel'
import PropTypes from 'prop-types'
import MainButton from '../MainButton'


const balanceBlockStyle = {
  bordered: {
    borderBottom: '1px solid #e2e2e2',
    paddingBottom: '20px',
  },
  description: {
    fontSize: '16px',
  },
  currency: {
    fontSize: '18px',
  },
}


const BalanceBlock = props => (
  <Panel>
    <div>
      <h3 className="mui--text-center m-t-none block-title">Wallet</h3>
      <table className="m-b-md full-width">
        <tbody>
          <tr>
            <td className="mui--text-left"><p style={balanceBlockStyle.description}>Available Balance</p></td>
            <td className="mui--text-right"><p
              style={balanceBlockStyle.currency}
            >{Number.parseFloat(props.userBalanceTotal).toPrecision(4)}<span> XRE</span>
            </p>
            </td>
          </tr>
          <tr>
            <td className="mui--text-left"><p style={balanceBlockStyle.description}>Locked</p></td>
            <td className="mui--text-right"><p
              style={balanceBlockStyle.currency}
            >{Number.parseFloat(props.userBalanceLocked).toPrecision(4)}<span> XRE</span>
            </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={balanceBlockStyle.bordered}>
        <Link className="revolver-btn-main" to="/send">Send</Link>
        <MainButton handleAction={props.receiveTokenAction} text="Receive" />
      </div>
      <div className="m-t-md">
        <p className="mui--text-center">
        <Link className="revolver-btn-main" to="/transactions">Transactions</Link>
        </p>
        <p className="mui--text-center">
          <Link className="revolver-btn-main" to="/reward-report">Reward Report</Link>
        </p>
      </div>
    </div>
  </Panel>
)

BalanceBlock.propTypes = {
  sendTokenAction: PropTypes.func.isRequired,
  receiveTokenAction: PropTypes.func.isRequired,
  getTransactionsAction: PropTypes.func.isRequired,
  rewardReportAction: PropTypes.func.isRequired,
  userBalanceTotal: PropTypes.number.isRequired,
  userBalanceLocked: PropTypes.number.isRequired,
}

export default BalanceBlock
