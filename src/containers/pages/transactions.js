import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Panel from 'muicss/lib/react/panel'
import Form from 'muicss/lib/react/form'

import BasePage from './basepage'
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
const ColItem = styled(Col)``

class TransactionsPage extends BasePage {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    window.scrollTo(0, 0)

    // request tx list
    this.props.requestTransactions()
  }

  renderPage() {
    const data =
      this.props.data &&
      this.props.data.map(item => (
        <RowItem key={item.id}>
          <Container>
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
      <Panel>
        <Form>
          <Container className="mui--text-left">
            <legend>Transactions</legend>
            
            {data}

          </Container>
        </Form>
      </Panel>
    )
  }
}

const mapStateToProps = state => {
  const { root } = state
  const data = root.getIn(['current', 'data'])
  console.log(data && data.toJS())
  return { data: data && data.toJS().data }
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
