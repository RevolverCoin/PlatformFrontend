import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Panel from 'muicss/lib/react/panel'
import Form from 'muicss/lib/react/form'

import BasePage from './basepage'

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
  }

  renderPage() {
    return (
      <Panel>
        <Form>
          <Container className="mui--text-left">
            <legend>Reward Report</legend>
            <RowHeader>
              <Col md="5">Block</Col>
              <Col md="7">Reward</Col>
            </RowHeader>
            <RowItem>
              <Col md="5">235</Col>
              <Col md="7">0.0923</Col>
            </RowItem>
          </Container>
        </Form>
      </Panel>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RewardReportPage)
