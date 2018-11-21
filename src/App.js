import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import './styles/custom.css'
import './styles/fonts.css'
import './styles/media.css'

import LoginPage from './containers/pages/guest/login'
import SignupPage from './containers/pages/guest/signup'
import FrontPage from './containers/pages/guest/front'
import NotFoundPage from './containers/pages/guest/404'
import ForgotPassword from './containers/pages/guest/forgotpassword'
import ChangePassword from './containers/pages/guest/resetpassword'
import VerifyEmail from './containers/pages/guest/verifyemail'

import PublicUserPage from './containers/pages/public/PublicUserPage'
import PublicPostPage from './containers/pages/public/PublicPostPage'


import UserPage from './containers/pages/VisitedUserPage/user'
import UserPageByAddress from './containers/pages/VisitedUserPage/UserByAddress'
import UserSupportedListPage from './containers/pages/VisitedUserPage/UserSupportedList'
import UserSupportingListPage from './containers/pages/VisitedUserPage/UserSupportingList'


import MyPostsPage from './containers/pages/myposts'
import ProfilePage from './containers/pages/profile'
import SearchPage from './containers/pages/search'
import SupportingPage from './containers/pages/supporting'
import SupportedPage from './containers/pages/supported'

import DiscoverPage from './containers/pages/discover'
import TimelinePage from './containers/pages/timeline'
import TopRatingPage from './containers/pages/toprating'
import GeneratorPage from './containers/pages/generator'

import SendPage from './containers/pages/send'
import RewardReportPage from './containers/pages/rewardreport'
import TransactionsPage from './containers/pages/transactions'

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

        <Route path="/myposts" key="my-posts" component={MyPostsPage} />
        <Route path="/profile" key="profile" component={ProfilePage} />
        
        <Route path="/posts/:userId" key="user-posts" component={UserPage} />
        <Route path="/address/:address" key="user-posts-by-address" component={UserPageByAddress} />
        
        <Route path="/supports/:userId/supported" key="user-supported" component={UserSupportedListPage} />
        <Route path="/supports/:userId/supporting" key="user-supporting" component={UserSupportingListPage} />


        <Route path="/search" key="search" component={SearchPage} />

        <Route path="/supporting" key="supporting" component={SupportingPage} />
        <Route path="/supported" key="supported" component={SupportedPage} />
        <Route path="/generator" key="generator" component={GeneratorPage} />

        <Route path="/timeline" key="timeline" component={TimelinePage} />
        <Route path="/discover" key="discover" component={DiscoverPage} />
        <Route path="/top" key="top" component={TopRatingPage} />

        <Route path="/send" key="send" component={SendPage} />
        <Route path="/reward-report" key="reward-report" component={RewardReportPage} />
        <Route path="/transactions" key="transactions" component={TransactionsPage} />
        

        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/changepassword" component={ChangePassword} />
        <Route exact path="/verifyemail" component={VerifyEmail} />
        
        <Route exact path="/public/user/:userId"  key='public-user' component={PublicUserPage} />
        <Route exact path="/public/post/:postId" key='public-post' component={PublicPostPage} />
        
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )
}


export default App
