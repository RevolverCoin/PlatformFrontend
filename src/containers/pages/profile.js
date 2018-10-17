import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BasePage from './basepage'
import ProfileBlock from '../ProfileBlock'


class ProfilePage extends BasePage {
  
  renderPage() {
    return (
      <ProfileBlock data={this.props.data} />
    )
  }
}


ProfilePage.defaultProps = {
  
}

ProfilePage.propTypes = {
}

const mapStateToProps = (state) => {
  const { root } = state
  const profile = root.getIn(['user', 'profile'])

  return {
    data: profile && profile.toJS() 
  }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
