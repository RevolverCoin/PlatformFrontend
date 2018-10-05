import React from 'react'
import { connect } from 'react-redux'
import BasePage from './basepage'

import SupportingList from '../SupportingList'

import {requestSupportingListAction} from '../../actions/actions'


class SupportingPage extends BasePage {

  componentDidMount() {
    this.props.requestSupportingList(this.props.userProfile.id, 1)
  }

  renderPage() {
    return (
        <SupportingList userProfile={this.props.userProfile} data={this.props.data}/>
    )
  }
}


SupportingPage.defaultProps = {
  
}

SupportingPage.propTypes = {
  
}

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
  requestSupportingList(userId, pageId){
    dispatch(requestSupportingListAction(userId,pageId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SupportingPage)
