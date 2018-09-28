import React from 'react'
import { connect } from 'react-redux'

import BasePage from './basepage'

import SupportedList from '../SupportedList'

import {requestSupportedListAction} from '../../actions/actions'

class SupportedPage extends BasePage {

  componentDidMount() {
    this.props.requestSupportedList(this.props.userId, 1)
  }

  renderPage() {
    return <SupportedList data={this.props.data}/>
  }
}

SupportedPage.defaultProps = {}

SupportedPage.propTypes = {}


function prepareData(state)
{
  const data = state.root.getIn(['user','supports','supported']);
  if (!data) return null;

  return data.toJS();
}

const mapStateToProps = state => ({
  userId: state.root.getIn(['user','profile','id']),
  data: prepareData(state)
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
