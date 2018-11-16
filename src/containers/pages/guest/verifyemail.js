import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import BaseFormPage from '../../../components/guest/baseFormPage'

import {verifyEmailAction} from '../../../actions/actions'


const SuccessMessage = styled.p`
  color: #3b9068;
`
const FailureMessage = styled.p`
  color: #c9341d;
`


class VerifyEmail extends BaseFormPage {
  constructor(props) {
    super(props)

  }

  componentDidMount() {

    const urlParams = new URLSearchParams(this.props.location.search)
    const code = urlParams.get('code')

    this.props.verifyEmail(code)
  }


  getCaption() {
    return 'Verify Email'
  }

  renderPage() {
    return (
      <div>
          {this.props.status && this.props.status === 'success' ? (
             <SuccessMessage>
              Email was verified successfully. Please sign in to continue.
              </SuccessMessage>
          ) : this.props.status && this.props.status === 'failure' ? (
            <FailureMessage> 
              Wrong code. Email was not verified.
            </FailureMessage>
          ): null
          }
      </div>
    )
  }
}

VerifyEmail.defaultProps = {}

VerifyEmail.propTypes = {}

const mapStateToProps = state => {
 
  return {
    status: state.root && state.root.getIn(['guest','verifyEmail','status'])
  }
}

const mapDispatchToProps = dispatch => ({

  verifyEmail(code) {
    dispatch(verifyEmailAction(code))
  }

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyEmail)
