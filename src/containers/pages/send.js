import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ContainerMUI from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Form from 'muicss/lib/react/form'
import InputMUI from 'muicss/lib/react/input'
import MainButton from './../../components/MainButton'
import PagePanel from '../../components/PagePanel'

import { sendAction } from './../../actions/actions'

import BasePage from './basepage'

const MessageType = {
  none: 'none',
  sent: 'sent',
  errorNotEnoughAmount: 'errorNotEnoughAmount',
  errorIncorrectAmount: 'errorIncorrectAmount',
  errorCannotSendToMyself: 'errorCannotSendToMyself',
  errorAddressEmpty: 'errorAddressEmpty',
  errorAmountEmpty: 'errorAmountEmpty'
}

const Container = styled(ContainerMUI)`
  margin-top: 30px;
  label {
    line-height: 18px;
    text-align: center;
  }
`
const Header = styled.div`
  margin-top: 15px;
`
const Message = styled.p`
  margin: 10px 0;
  color: ${props => props.error ? 'red' : 'green'  };
`
const Input = styled(InputMUI)`
`


class SendPage extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
      addressTo: '',
      amount: 0,
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

    let message = MessageType.none

    if (!this.state.amount || this.state.amount==='0')  {
      message = MessageType.errorIncorrectAmount
      console.log(111)
    } else if (this.state.amount > this.props.availableAmount)  {
      message = MessageType.errorNotEnoughAmount
    } else if (this.state.addressTo === this.props.addressFrom)  {
      message = MessageType.errorCannotSendToMyself
    } else if (!this.state.addressTo || !this.state.addressTo.trim())  {
      message = MessageType.errorAddressEmpty
    } 
 
    console.log(message)
    this.setState({ message })

    if (message === MessageType.none) {
      this.props.send(this.props.addressFrom, this.state.addressTo, this.state.amount)
      this.setState({ message: MessageType.sent })
    } 
  }

  renderPage() {
    
    // TODO: implement message mapping 
    let message = null
    if (this.state.message === MessageType.sent) 
      message = 'Amount has been sent'
    else if (this.state.message === MessageType.errorIncorrectAmount)
      message = 'Incorrect amount to send'
    else if (this.state.message === MessageType.errorNotEnoughAmount) 
      message = 'Not enough XRE'
    else if (this.state.message === MessageType.errorCannotSendToMyself) 
      message = 'Cannot send to myself'
    else if (this.state.message === MessageType.errorAddressEmpty) 
      message = 'Incorrect address'


    return (
      <PagePanel caption='Send'>
        <Form>
          <Container>
            <Row>
              <Col md="3" className="mui--text-left">
                <Header>Address</Header>
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
                <Header>Amount</Header>
              </Col>
              <Col md="9">
                <Input
                  name="amount"
                  type='number'
                  id="amount"
                  label="Required"
                  placeholder={this.state.amount}
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </Row>

            <Row>
              <Col md="3" className="mui--text-left" />
              <Col md="9">
                <MainButton className="revolver-btn-main" handleAction={this.onSend} text="Send" />
              </Col>
            </Row>
            <Row>
              <Col md="3" className="mui--text-left" />
              <Col md="9">
                <Message error={this.state.message !== MessageType.sent}>{message}</Message>
              </Col>
            </Row>
          </Container>
        </Form>
      </PagePanel>
    )
  }
}

const mapStateToProps = state => {
  const { root } = state
  const addressFrom =
    root && root.hasIn(['user', 'profile', 'address']) && root.getIn(['user', 'profile', 'address'])

  const availableAmount = root && root.getIn(['user', 'balance', 'total'])

  return { 
    addressFrom, 
    availableAmount
  }
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
