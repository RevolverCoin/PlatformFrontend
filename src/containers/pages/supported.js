import React from 'react'
import { connect } from 'react-redux'

import BasePage from './basepage'

import SupportedList from '../SupportedList'

import {requestSupportedListAction} from '../../actions/actions'

class SupportedPage extends BasePage {

  componentDidMount() {
    this.props.requestSupportedList(this.props.userProfile.id, 1)
  }

  renderPage() {
    return <SupportedList userProfile={this.props.userProfile} data={this.props.data}/>
  }
}

SupportedPage.defaultProps = {}

SupportedPage.propTypes = {}


function prepareSupports(state)
{
  // get profiles of supporting 
  const data = state.root && state.root.getIn(['current','supportList']);
  if (!data)
    return null;

  return data.toJS();
}

function prepareProfile(state)
{
  const data = state.root.getIn(['user','profile']);
  if (!data)
    return null;


  return data.toJS();
}

const mapStateToProps = (state) => ({
  data: prepareSupports(state),
  userProfile: prepareProfile(state)
})


const mapDispatchToProps = dispatch => ({

  requestSupportedList(userId, pageId){
    dispatch(requestSupportedListAction(userId,pageId))
  }

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupportedPage)
