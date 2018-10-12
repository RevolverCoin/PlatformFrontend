import { connect } from 'react-redux'

import AvatarBlock from '../../components/sideblocks/AvatarBlock'


const mapStateToProps = (state) => {
  const { root } = state
  const profile = root.hasIn(['user', 'profile']) && root.getIn(['user', 'profile'])

  return {
    userProfileAvatar: profile && profile.get('avatar'),
    userProfileUsername: profile && profile.get('username'),
    userProfileDescription: profile && profile.get('description'),
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AvatarBlock)
