import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

import Avatar from 'react-avatar'
import { requestTopRatingAction } from '../../../actions/actions'

import PublicTopListItem from '../../../components/public/PublicTopListItem'


const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;

  img {
    border-radius: 50%;
  }
`
const Panel = styled.div`
  background: #f1f1f1;
  text-align: left;
  border: 1px solid #a1a1a1;
  text-align: center;
  padding: 20px;
`
const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`
const Caption = styled.div`
  text-transform: uppercase;
  margin: 0;
  text-align: left;
  border: 1px solid #a1a1a1;
  border-bottom: none;
  background: #f1f1f1;
  font-size: 14px;
  color: #832e55;
  padding: 8px 0 8px 15px;
`

const ItemContainer = styled.div`
`

class TopBlock extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.requestTopRating()
  }

  render() {



    let itemsList =
      this.props.topList &&
      this.props.topList.slice(0,10).map((item, index) => (
        <ItemContainer key={item._id}>
          <PublicTopListItem
            username={item.username}
            description={item.desc}
            avatar={item.avatar}
            supportCount={item.supportCount}
            address={item.address}
            userId={item._id}
            index={index}
          />
        </ItemContainer>
      ))

    return (
      <div>
        <Caption>Top 10</Caption>
        <Panel>
        {itemsList}
        </Panel>
      </div>
    )
  }
}

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
)(TopBlock)
