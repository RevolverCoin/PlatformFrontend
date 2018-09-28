import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import UserListItem from './UserListItem'

const Panel = styled.div`
  background-color:white;
  text-align:left;
  border: 1px solid #a1a1a1;
`

const Caption = styled.div`
  background-color: #fafafa;
  border-bottom: 1px solid #a1a1a1;
  color: #832e55;
  text-transform:uppercase;
  font-size:14px;
  padding:8px 0 8px 15px;
`


class SupportingList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let supportingList =
      this.props.data &&
      this.props.data.map(user => (
        <UserListItem
          username={user.username}
          description={user.desc}
          key={user.id}
          id={user.id}
        />
      ))

    return (
      <Panel>
        <Caption>Supporting</Caption>
        {supportingList}
      </Panel>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupportingList)
