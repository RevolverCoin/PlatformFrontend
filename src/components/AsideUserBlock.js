import React from 'react'
import AvatarBlock from '../containers/AvatarBlock'
import SupportsBlock from '../containers/SupportsBlock'
import BalanceBlock from '../containers/BalanceBlock'


class AsideUserBlock extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount()
  {
    if (!this.props.userId) {
      this.props.getUserInfo()
    }
  }

  render() {
    return (
      <div>
        <AvatarBlock />
        <SupportsBlock />
        <BalanceBlock />
      </div>
    )
  }
}

export default AsideUserBlock
