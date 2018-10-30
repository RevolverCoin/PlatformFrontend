import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BasePage from '../basepage'

import { getUserInfoByAddressAction } from '../../../actions/actions'


class UserPageByAddress extends BasePage {

  componentDidMount() {
    const userAddress = this.props.match.params.address;
    this.props.getUserInfoByAddress(userAddress)
  }

  renderPage() {
    return (
     <div></div>
    )
  }
}


UserPageByAddress.defaultProps = {
  
}

UserPageByAddress.propTypes = {
  
}


const mapStateToProps = (state) => {
   return {
  }
}

const mapDispatchToProps = dispatch => ({
    getUserInfoByAddress(address) {
        dispatch(getUserInfoByAddressAction(address))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPageByAddress)
