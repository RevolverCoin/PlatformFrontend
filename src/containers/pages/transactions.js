import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

import BasePage from './basepage'
import PagePanel from '../../components/PagePanel'

import { requestTransactionsAction } from '../../actions/actions'

import {toCurrencyAmount} from '../../utils/misc'


const RowItem = styled(Row)`
  border: 1px solid #999;
  background-color: #f9f9f9;
  padding: 5px;
  white-space: nowrap;
    overflow: hidden;
  text-overflow: ellipsis;

`
const ColHeader = styled(Col)`
  border-right: 1px solid #999;
`
const ColItem = styled(Col)`
  font-weight: ${ props=> props.type ? 'bold' : 'normal'};
`
const Spacer = styled.div`
  margin: 1px;
`

class TransactionsPage extends BasePage {
  constructor(props) {
    super(props)
    this.state = {}

    this.parseItemType = this.parseItemType.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0)

    // request tx list
    this.props.requestTransactions()
  }

  parseItemType(item)
  {
    if (item.type === 'txSupport') {
      if (item.amount === 0)
        return 'Remove support'
      else 
      return 'Add support'
    }

    if (item.type === 'txReward') {
      return 'Reward'
    }

    if (item.type === 'txClaimGenerator') {
      if (item.addressFrom === null)
        return 'Claim Generator' 
      else 
        return 'Unclaim Generator'
    }
    if (item.type === 'txNormal') {
      if (item.addressFrom === this.props.userAddress)
        return 'Send'
      else
        return 'Receive'
    }

    return 'Unknown'
  }


  renderPage() {
    const data =
      this.props.data &&
      this.props.data.map(item => (
        <RowItem key={item.id}>
          <Container>
          <Row>
              <ColHeader md="2">Type</ColHeader>
              <ColItem md="10" type>{this.parseItemType(item)}</ColItem>
            </Row>
            <Row>
              <ColHeader md="2">Block</ColHeader>
              <ColItem md="10">{item.blockHeight}</ColItem>
            </Row>
            <Row>
              <ColHeader md="2">Txid</ColHeader>
              <ColItem md="10">{item.id}</ColItem>
            </Row>
            <Row>
              <ColHeader md="2">From</ColHeader>
              <ColItem md="10">{item.addressFrom}</ColItem>
            </Row>
            <Row>
              <ColHeader md="2">To</ColHeader>
              <ColItem md="10">{item.addressTo}</ColItem>
            </Row>
            <Row>
              <ColHeader md="2">Amount</ColHeader>
              <ColItem md="10">{toCurrencyAmount(item.amount, 8)}</ColItem>
            </Row>

          </Container>
        </RowItem>
      ))

    return (
      <PagePanel caption="Transactions">
          <Container className="mui--text-left">
            <Spacer/>

            {data}

          </Container>
      </PagePanel>
    )
  }
}

const mapStateToProps = state => {
  const { root } = state
  const data = root && root.getIn(['current', 'data'])
  const userAddress = root && root.getIn(['user', 'profile', 'userAddress'])

  return { 
    data: data && data.toJS().data, 
    userAddress 
  }
}

const mapDispatchToProps = dispatch => ({
  requestTransactions() {
    dispatch(requestTransactionsAction())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionsPage)
