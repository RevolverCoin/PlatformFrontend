import React from 'react'
import PublicUserPage from './public/PublicUserPage'  
import UserPage from './VisitedUserPage/user'  


class UserPageSelector extends React.Component {

    render() {
        const loggedIn = localStorage.getItem('isLogged')

        return loggedIn ? 
                <UserPage userId={this.props.match.params.userId}/> : 
                <PublicUserPage userId={this.props.match.params.userId}/> 
        
    }
}

export default UserPageSelector;
