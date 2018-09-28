import React from 'react'
import { connect } from 'react-redux'
import BasePage from './basepage'

import SupportingList from '../SupportingList'

import {requestSupportingListAction} from '../../actions/actions'


class SupportingPage extends BasePage {

  componentDidMount() {
    this.props.requestSupportingList(this.props.userId, 1)
  }

  renderPage() {
    return (
        <SupportingList data={this.props.data}/>
    )
  }
}



SupportingPage.defaultProps = {
  
}

SupportingPage.propTypes = {
  
}


function prepareData(state)
{
  const data = state.root.getIn(['user','supports','supporting']);
  if (!data) return null;

  console.log("DATA", data)
  return data.toJS();
}


const mapStateToProps = (state) => ({
  userId: state.root.getIn(['user','profile','id']),
  data: prepareData(state)
})

const mapDispatchToProps = dispatch => ({
  requestSupportingList(userId, pageId){
    dispatch(requestSupportingListAction(userId,pageId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SupportingPage)
