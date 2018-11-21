import React from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Panel from 'muicss/lib/react/panel'
import Form from 'muicss/lib/react/form'

import BasePage from './basepage'
import { claimGeneratorAction } from '../../actions/actions'

import MainButton from '../../components/MainButton'

const Message = styled.p`
    color: red
`


class GeneratorPage extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
        message: ""
    }

    this.onClaim = this.onClaim.bind(this)
    this.onUnclaim = this.onUnclaim.bind(this)
  }

  setMessage() 
  {
    this.setState({message: "Transaction sent. Wait the next block and reload page"})
  }

  onClaim() {
    this.props.claimGenerator(true)
    this.setMessage()
  }

  onUnclaim() {
    this.props.claimGenerator(false)
    this.setMessage()
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  renderPage() {
    return (
      <Panel>
        <Form>
          <Container className="mui--text-left">
            <legend>Generator</legend>

            <h4>Your current type: {this.props.type}</h4>

            {this.props.type === 'Generator' ? (
              <div>
                <p>
                  Generator cost: 100 XRE <br />
                  Funds will be unlocked and returned back to your balance
                </p>
                <MainButton className="revolver-btn-main" handleAction={this.onUnclaim} text="Unclaim Generator"/>
              </div>
            ) : (
              <div>
                <p>
                  Generator cost: 100 XRE <br />
                  These funds will be locked until you Unclaim Generator
                </p>
                <MainButton className="revolver-btn-main" handleAction={this.onClaim} text="Claim Generator" />
              </div>
            )}

            <Message>{this.state.message}</Message>
          </Container>
        </Form>
      </Panel>
    )
  }
}

const mapStateToProps = state => {
  const { root } = state
  const type = root.getIn(['user', 'type'])

  return { type }
}

const mapDispatchToProps = dispatch => ({
  claimGenerator(claim) {
    dispatch(claimGeneratorAction(claim))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GeneratorPage)
