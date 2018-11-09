import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Panel from 'muicss/lib/react/panel'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import MainButton from './../../components/MainButton'

import { sendAction } from './../../actions/actions'

import BasePage from './basepage'

const MessageType = {
  none: 'none',
  sent: 'sent',
}

class SendPage extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
      addressTo: '',
      amount: '',
      message: MessageType.none,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.onSend = this.onSend.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    this.setState({ message: MessageType.none })
  }

  onSend() {
    if (this.state.amount > 0) {
      this.props.send(this.props.addressFrom, this.state.addressTo, this.state.amount)
      this.setState({ message: MessageType.sent })
    }
  }

  renderPage() {
    let message = null
    if (this.state.message === MessageType.sent) {
      message = 'Amount has been sent'
    }

    return (
      <Panel>
        <Form>
          <Container className="edit-profile-block">
            <legend className="mui--text-left">Send</legend>
            <Row>
              <Col md="3" className="mui--text-left">
                <label htmlFor="address">Address</label>
              </Col>
              <Col md="9">
                <Input
                  name="addressTo"
                  id="address"
                  label="Required"
                  placeholder={this.state.addressTo}
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col md="3" className="mui--text-left">
                <label htmlFor="amount">Amount</label>
              </Col>
              <Col md="9">
                <Input
                  name="amount"
                  id="amount"
                  label="Required"
                  placeholder={this.state.amount}
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Row>

            <MainButton className="revolver-btn-main" handleAction={this.onSend} text="Send" />

            
          </Container>
        </Form>
        <p>{message}</p>
      </Panel>
    )
  }
}

const mapStateToProps = state => {
  const { root } = state
  const address =
    root.hasIn(['user', 'profile', 'address']) && root.getIn(['user', 'profile', 'address'])

  return { addressFrom : address }
}

const mapDispatchToProps = dispatch => ({
  send(addressFrom, addressTo, amount) {
    dispatch(sendAction(addressFrom, addressTo, amount))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendPage)
