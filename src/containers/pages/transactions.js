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
import {requestTransactionsAction} from '../../actions/actions'

const RowHeader = styled(Row)`
    border: 1px solid #999
    background-color: #eee;
    font-weight: bold;
`
const RowItem = styled(Row)`
  border: 1px solid #999;
  background-color: #f9f9f9;
  padding:5px;
`
const ColHeader = styled(Col)`
  border-right: 1px solid #999;
  
`
const ColItem = styled(Col)`
   
`


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
    return (
      <Panel>
        <Form>
          <Container className="mui--text-left">
            <legend>Transactions</legend>
            <RowItem>
              <Container>
                <Row>
                  <ColHeader md="2">Block</ColHeader>
                  <ColItem md="10">4</ColItem>
                </Row>
                <Row>
                  <ColHeader md="2">Txid</ColHeader>
                  <ColItem md="10">0xaaffaaeeddeeffaaddbb33434565</ColItem>
                </Row>
                <Row>
                  <ColHeader md="2">From</ColHeader>
                  <ColItem md="10">13mNf2rNDcVMhNZehRpKJbyLLc3ftpsy3z</ColItem>
                </Row>
                <Row>
                  <ColHeader md="2">To</ColHeader>
                  <ColItem md="10">13mNf2rNDcVMhNZehRpKJbyLLc3ftpsy3z</ColItem>
                </Row>
                <Row>
                  <ColHeader md="2">Amount</ColHeader>
                  <ColItem md="10">10</ColItem>
                </Row>
              </Container>
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

const mapDispatchToProps = dispatch => ({
    requestTransactions()
    {
        dispatch(requestTransactionsAction())
    }

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionsPage)
