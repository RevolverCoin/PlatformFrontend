import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import BasePage from './../basepage'
import PagePanel from '../../../components/PagePanel'

import UserListItem from './UserListItem'

import { requestSupportingListAction } from '../../../actions/actions'


class UserSupportingListPage extends BasePage {
  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getSupports(userId)
  }

  renderPage() {

    let supportingList =
    this.props.data &&
    this.props.data.map(user => (
      <UserListItem
        username={user.profile.username}
        avatar={user.profile.avatar}
        description={user.profile.desc}
        key={user.profile.id}
        id={user.profile.id}
      />
    ))

    return (
      <PagePanel caption='Supporting List'>
            {supportingList && supportingList.length > 0 ? supportingList : (
                <p>No supports</p>
            )}
      </PagePanel>
    )
  }
}

UserSupportingListPage.defaultProps = {}

UserSupportingListPage.propTypes = {}

const mapStateToProps = state => {
  const data = state.root && state.root.getIn(['current', 'supportList'])
  return { data: data && data.toJS() }
}

const mapDispatchToProps = dispatch => ({
  getSupports(userId) {
    dispatch(requestSupportingListAction(userId, 0))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSupportingListPage)
