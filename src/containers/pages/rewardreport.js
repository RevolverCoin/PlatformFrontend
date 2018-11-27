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
import PagePanel from '../../components/PagePanel'

import { ProjectDiagram } from 'styled-icons/fa-solid/ProjectDiagram'

import { requestRewardTransactionsAction } from '../../actions/actions'

import { toCurrencyAmount } from '../../utils/misc'

const RowHeader = styled(Row)`
  border: 1px solid #999;
  background-color: #eee;
  font-weight: bold;
`
const RowItem = styled(Row)`
  border-bottom: 1px solid #999;
`
const RewardGraphicsWrapper = styled.div`
  text-align: center;
  padding: 30px;
`

const RewardGraphics = styled(ProjectDiagram)``

const Estimated = styled.p`
  text-align: center;
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

      let estimated = 0;

      if (this.props.data && this.props.data.length > 0) {
        const blocksPerDay = 60 * 24 // 1440;
        const lastBlock = this.props.data[0].blockHeight;
        estimated = this.props.data.reduce( (acc, curValue) => {
          if (this.props.blockHeight - curValue.blockHeight < blocksPerDay)
            return acc + curValue.amount;
          return acc
        }, 0)
      }


    return (
      <PagePanel caption="Reward report">
        <RewardGraphicsWrapper>
          <RewardGraphics size="36" />
        </RewardGraphicsWrapper>

        <Estimated>
          Estimated: {estimated} XRE / day
        </Estimated>
        <Container className="mui--text-left">
          <RowHeader>
            <Col md="2">Block</Col>
            <Col md="2">Reward</Col>
            <Col md="8">Generator</Col>
          </RowHeader>

          {data}
        </Container>
      </PagePanel>
    )
  }
}

const mapStateToProps = state => {
  const { root } = state
  const data = root.getIn(['rewards', 'data'])
  const blockHeight = root.getIn(['stats', 'blockHeight'])
  return { data: data && data.toJS().data, blockHeight }
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
