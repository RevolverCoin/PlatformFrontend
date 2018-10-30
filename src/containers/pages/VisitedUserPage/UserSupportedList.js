import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';

import BasePage from './../basepage'


import UserListItem from './UserListItem'

import { requestSupportedListAction } from '../../../actions/actions'



const Panel = styled.div`
  background-color:white;
  text-align:left;
  border: 1px solid #a1a1a1;
`


class UserSupportedListPage extends BasePage {
  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getSupports(userId)
  }

  renderPage() {

    let supportedList =
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
        <Panel>
            {supportedList && supportedList.length > 0 ? supportedList : (
                <p>No supports</p>
            )}

        </Panel>
    )
  }
}

UserSupportedListPage.defaultProps = {}

UserSupportedListPage.propTypes = {}

const mapStateToProps = state => {
  const data = state.root && state.root.getIn(['current', 'supportList'])
  return { data: data && data.toJS() }
}

const mapDispatchToProps = dispatch => ({
  getSupports(userId) {
    dispatch(requestSupportedListAction(userId, 0))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSupportedListPage)
