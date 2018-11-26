import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

import { Wallet } from 'styled-icons/fa-solid'


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
  background: #f1f1f1;
  font-size: 14px;
  color: #832e55;
  padding: 8px 0 8px 15px;
`

const RowBalanceName = styled(Row)`
  text-align:left;
  font-size:16px;
  font-weight: bold;

`

const RowBalanceValue = styled(Row)`
  text-align:left;
  font-size:14px;

  margin-bottom:10px;
`
const SendButtonWrapper = styled.div`
    border-bottom: 1px solid #e2e2e2;
    padding-bottom: 20px;
    margin-top:20px;
`

const BalanceBlock = props => (
  <div>
    <Caption><Wallet size="16"/> Wallet</Caption>
    <Panel>
      <RowBalanceName>
        <Col md="12">Available Balance</Col>
      </RowBalanceName>

      <RowBalanceValue>
        <Col md="12">{Number.parseFloat(props.userBalanceTotal).toFixed(4)} XRE</Col>
      </RowBalanceValue>

      <RowBalanceName>
        <Col md="12">Locked Balance</Col>
      </RowBalanceName>

      <RowBalanceValue>
        <Col md="12">{Number.parseFloat(props.userBalanceLocked).toFixed(4)} XRE</Col>
      </RowBalanceValue>

      <SendButtonWrapper>
        <Link className="revolver-btn-main" to="/send">
          Send
        </Link>
      </SendButtonWrapper>
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
