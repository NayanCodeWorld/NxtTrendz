import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import SearchPage from './components/SearchPage'
import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import SearchContext from './context/SearchContext'

import './App.css'

class App extends Component {
  state = {
    search: '',
  }

  onHandleStateChange = value => this.setState({search: value})

  render() {
    const {search} = this.state
    return (
      <SearchContext.Provider
        value={{search, changeSearch: this.onHandleStateChange}}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <ProtectedRoute exact path="/search" component={SearchPage} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </SearchContext.Provider>
    )
  }
}
export default App
