import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Panel from 'muicss/lib/react/panel'
import Form from 'muicss/lib/react/form'

import BasePage from './basepage'

import { requestRewardTransactionsAction } from '../../actions/actions'

import { toCurrencyAmount } from '../../utils/misc'

const RowHeader = styled(Row)`
    border: 1px solid #999
    background-color: #eee;
    font-weight: bold;
`
const RowItem = styled(Row)`
  border-bottom: 1px solid #999;
`

class RewardReportPage extends BasePage {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    window.scrollTo(0, 0)

    this.props.requestRewardTransactions()
  }

  renderPage() {
    const data =
      this.props.data &&
      this.props.data.map(item => (
        <RowItem key={item.id}>
          <Col md="2">{item.blockHeight}</Col>
          <Col md="2">{toCurrencyAmount(item.amount, 8)}</Col>
          <Col md="8">
            {item.addressFrom ? (
              <Link to={'/address/' + item.addressFrom}>{item.addressFrom}</Link>
            ) : null}
          </Col>
        </RowItem>
      ))

    return (
      <Panel>
        <Form>
          <Container className="mui--text-left">
            <legend>Reward Report</legend>
            <RowHeader>
              <Col md="2">Block</Col>
              <Col md="2">Reward</Col>
              <Col md="8">Generator</Col>
            </RowHeader>

            {data}
          </Container>
        </Form>
      </Panel>
    )
  }
}

const mapStateToProps = state => {
  const { root } = state
  const data = root.getIn(['rewards', 'data'])
  return { data: data && data.toJS().data }
}

const mapDispatchToProps = dispatch => ({
  requestRewardTransactions() {
    dispatch(requestRewardTransactionsAction())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RewardReportPage)
