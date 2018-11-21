import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import BasePage from './basepage'
import UserTopListItem from '../UserTopListItem'
import UserMenu from '../../components/UserMenu'


import { requestTopRatingAction } from '../../actions/actions'

const Panel = styled.div`
  background-color: white;
  text-align: left;
  border: 1px solid #a1a1a1;
`


const ItemContainer = styled.div`
  border-bottom: 1px solid #a1a1a1;
`

class TopRatingPage extends BasePage {
  componentDidMount() {
    this.props.requestTopRating(0)
  }

  renderPage() {
    let itemsList =
      this.props.topList &&
      this.props.topList.map((item, index) => (
        <ItemContainer key={item._id}>
          <UserTopListItem
            username={item.username}
            description={item.desc}
            avatar={item.avatar}
            supportCount={item.supportCount}
            address={item.address}
            id={item._id}
            index={index}
          />
        </ItemContainer>
      ))

    return (
      <Panel>
        <UserMenu active='top'/>
        {itemsList}
      </Panel>
    )
  }
}

TopRatingPage.defaultProps = {}

TopRatingPage.propTypes = {}

const mapStateToProps = state => {
  const data = state.root && state.root.getIn(['top', 'data'])
  return {
    topList: data && data.toJS(),
  }
}

const mapDispatchToProps = dispatch => ({
  requestTopRating() {
    dispatch(requestTopRatingAction())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopRatingPage)
