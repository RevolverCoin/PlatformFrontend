import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Container from 'muicss/lib/react/container'

import BasePage from './basepage'
import PagePanel from '../../components/PagePanel'
import { claimGeneratorAction } from '../../actions/actions'

import MainButton from '../../components/MainButton'

const Message = styled.p`
    color: red;
`
const GENERATOR_COST = 100

class GeneratorPage extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
        message: ""
    }

    this.onClaim = this.onClaim.bind(this)
    this.onUnclaim = this.onUnclaim.bind(this)
  }

  onClaim() {

    if (this.props.availableAmount < GENERATOR_COST) {
      this.setState({message: "Not enough XRE to lock"})  
    } else {
      this.props.claimGenerator(true)
      this.setState({message: "Transaction has been sent. Wait for the next block to take effect"})
    }
  }

  onUnclaim() {
    this.props.claimGenerator(false)
    this.setState({message: "Transaction has been sent. Wait for the next block to take effect"})
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  renderPage() {
    return (
      <PagePanel caption='Generator'>
          <Container className="mui--text-left">

            <h4>Your current type: {this.props.type}</h4>

            {this.props.type === 'Generator' ? (
              <div>
                <p>
                  Generator cost: {GENERATOR_COST} XRE <br />
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
      </PagePanel>
    )
  }
}

const mapStateToProps = state => {
  const { root } = state
  const type = root.getIn(['user', 'type'])
  const availableAmount = root && root.getIn(['user', 'balance', 'total'])


  return { type, availableAmount }
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
