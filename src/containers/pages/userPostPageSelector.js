import React from 'react'
import PublicPostPage from './public/PublicPostPage'  
import UserPostPage from './VisitedUserPage/userPost'  


class UserPostPageSelector extends React.Component {

    render() {
        const loggedIn = localStorage.getItem('isLogged')

        return loggedIn ? 
                <UserPostPage postId={this.props.match.params.postId}/> : 
                <PublicPostPage postId={this.props.match.params.postId}/> 
        
    }
}

export default UserPostPageSelector;
