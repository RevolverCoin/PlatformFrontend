import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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

const Panel = styled.div`
  background: white;
  text-align: left;
  border: 1px solid #a1a1a1;
  border-top: none;
  text-align: center;
  padding: 20px;
`
const Caption = styled.div`
  text-transform: uppercase;
  margin: 0;
  text-align: left;
  border: 1px solid #a1a1a1;
  border-top: none;
  background: #fafafa;
  font-size: 14px;
  color: #832e55;
  padding: 8px 0 8px 15px;
`

const BalanceBlock = props => (
  <div>
    <Caption>Wallet</Caption>
    <Panel>
      <div>
        <table className="m-b-md full-width">
          <tbody>
            <tr>
              <td className="mui--text-left">
                <p style={balanceBlockStyle.description}>Available Balance</p>
              </td>
              <td className="mui--text-right">
                <p style={balanceBlockStyle.currency}>
                  {Number.parseFloat(props.userBalanceTotal).toPrecision(4)}
                  <span> XRE</span>
                </p>
              </td>
            </tr>
            <tr>
              <td className="mui--text-left">
                <p style={balanceBlockStyle.description}>Locked</p>
              </td>
              <td className="mui--text-right">
                <p style={balanceBlockStyle.currency}>
                  {Number.parseFloat(props.userBalanceLocked).toPrecision(4)}
                  <span> XRE</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={balanceBlockStyle.bordered}>
          <Link className="revolver-btn-main" to="/send">
            Send
          </Link>
        </div>
        <div className="m-t-md">
          <p className="mui--text-center">
            <Link className="revolver-btn-main" to="/transactions">
              Transactions
            </Link>
          </p>
          <p className="mui--text-center">
            <Link className="revolver-btn-main" to="/reward-report">
              Reward Report
            </Link>
          </p>
        </div>
      </div>
    </Panel>
  </div>
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
