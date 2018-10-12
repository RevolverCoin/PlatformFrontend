import React from 'react'
import AvatarBlock from '../../containers/sideblocks/AvatarBlock'
import SupportsBlock from '../../containers/sideblocks/SupportsBlock'
import BalanceBlock from '../../containers/sideblocks/BalanceBlock'


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
