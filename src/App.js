import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import './styles/custom.css'
import './styles/fonts.css'
import './styles/media.css'

import LoginPage from './containers/pages/login'
import SignupPage from './containers/pages/signup'
import HomePage from './containers/pages/home'
import FrontPage from './containers/pages/front'
import NotFoundPage from './containers/pages/404'
import UserPage from './containers/pages/VisitedUserPage/user'
import ProfilePage from './containers/pages/profile'
import SearchPage from './containers/pages/search'
import SupportingPage from './containers/pages/supporting'
import SupportedPage from './containers/pages/supported'

const App = () => {

  const loggedIn = localStorage.getItem('isLogged');

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
          loggedIn ? (
            <Redirect to="/myposts" />
          ) : (
              <FrontPage />
            )
        )} />

        <Route path="/myposts" key="my-posts" component={HomePage} />
        <Route path="/profile" key="profile" component={ProfilePage} />
        <Route path="/posts/:userId" key="user-posts" component={UserPage} />
        <Route path="/search" key="search" component={SearchPage} />

        <Route path="/supporting" key="supporting" component={SupportingPage} />
        <Route path="/supported" key="supported" component={SupportedPage} />


        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )
}


export default App
