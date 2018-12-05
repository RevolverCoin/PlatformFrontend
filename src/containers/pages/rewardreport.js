import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import { ProjectDiagram } from 'styled-icons/fa-solid/ProjectDiagram'
import {defaultInitials, getRandomColor} from '../../utils/misc'


import BasePage from './basepage'
import PagePanel from '../../components/PagePanel'
import Graph, {prepareData} from '../../components/graph'

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
  height:400px;
`

const RewardGraphics = styled(ProjectDiagram)``

const Estimated = styled.p`
  text-align: center;
  span {
    font-weight: bold;
  }
`
const GraphComponent = styled(Graph)`
  width: 400px;
  height: 400px;
`

class RewardReportPage extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
      redirectUrl: null
    }

    this.onSelectedNode = this.onSelectedNode.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0)

    this.props.requestRewardTransactions()
  }

  renderRedirect = () => {
    if (this.state.redirectUrl) {
      return <Redirect to={this.state.redirectUrl} />
    }
  }

  onSelectedNode(userId)
  {
      this.setState({redirectUrl: `/user/${userId}`})
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
        estimated = this.props.data.reduce( (acc, curValue) => {
          if (this.props.blockHeight - curValue.blockHeight < blocksPerDay)
            return acc + curValue.amount;
          return acc
        }, 0)

        const deltaHeight = this.props.data[0].blockHeight - this.props.data[this.props.data.length-1].blockHeight 
        
        estimated = estimated * blocksPerDay / (deltaHeight + 1);  
        estimated = estimated.toPrecision(4)

      }


    return (
      <PagePanel caption="Reward report">
        <RewardGraphicsWrapper>
          {this.renderRedirect()}
          {this.props.graph && <GraphComponent graph={this.props.graph} onNodeDoubleClick={userId=>this.onSelectedNode(userId)}/>}
        </RewardGraphicsWrapper>

        <Estimated>
          Estimated: <span>{estimated} XRE / day</span>
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
  const rewardTotal = root.getIn(['rewards', 'total'])

  const username = root.getIn(['user', 'profile', 'username'])

  const owner = {
    userId: root.getIn(['user', 'profile', 'id']),
    username,
    image: root.getIn(['user', 'profile', 'avatar']),
    imageColor: getRandomColor(username),
    imageInitials: defaultInitials(username),
  }


  const supports = rewardTotal && rewardTotal.toJS().map(item=> {
    return {
      userId: item._id,
      username: item.username,
      image: item.avatar,
      to: item.supporting ? true : undefined,
      from: item.supported ? true : undefined, 
      amount: Math.round(item.rewardTotal * 10000) / 10000,
      imageColor: getRandomColor(item.username),
      imageInitials: defaultInitials(item.username)
    }
  })

  const graph = owner.userId && supports && prepareData(owner, supports);
  return { data: data && data.toJS().data, blockHeight, graph }
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
