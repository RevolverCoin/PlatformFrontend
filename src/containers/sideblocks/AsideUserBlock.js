import { connect } from 'react-redux'
import AsideUserBlock from '../../components/sideblocks/AsideUserBlock'
import {getUserInfoAction} from '../../actions/actions' 

const mapStateToProps = (state) => {

    const { root } = state
    const userId =  root.getIn(['user', 'profile', 'id'])

    return {
        userId 
    }
}

const mapDispatchToProps = dispatch => ({
    getUserInfo() {
        dispatch(getUserInfoAction())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AsideUserBlock)
