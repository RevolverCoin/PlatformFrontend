import React from 'react'
import AvatarBlock from '../containers/AvatarBlock'
import SupportsBlock from '../containers/SupportsBlock'
import BalanceBlock from '../containers/BalanceBlock'

const AsideUserBlockStyle = {
}

const AsideUserBlock = () => (
  <div style={AsideUserBlockStyle}>
    <AvatarBlock />
    <SupportsBlock />
    <BalanceBlock />
  </div>
)

export default AsideUserBlock
