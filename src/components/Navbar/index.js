import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import {GiHamburgerMenu} from 'react-icons/gi'
import {MdCancel} from 'react-icons/md'
import {FaSearch} from 'react-icons/fa'

import Cookies from 'js-cookie'

import SearchContext from '../../context/SearchContext'

import './index.css'

class Navbar extends Component {
  state = {isOpenBurgerLink: false}

  setBurgerLinkStatus = () => {
    this.setState(prvState => ({
      isOpenBurgerLink: !prvState.isOpenBurgerLink,
    }))
  }

  onHandleLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {isOpenBurgerLink} = this.state

    return (
      <SearchContext.Consumer>
        {value => {
          const {search, changeSearch} = value
          const {fetchSearchData} = this.props
          const onHandleChangeSearch = event => changeSearch(event.target.value)
          const onSearch = () => {
            fetchSearchData(search)
          }
          return (
            <nav className="navbar-bg-container">
              <div className="sm-navbar-container">
                <div className="sm-navbar-btn-container">
                  <Link to="/">
                    <img
                      src="https://res.cloudinary.com/dwdkfnsrg/image/upload/v1682340256/Group_7807_ocbveq.png"
                      alt="website logo"
                    />
                  </Link>
                  <button type="button" onClick={this.setBurgerLinkStatus}>
                    <GiHamburgerMenu />
                  </button>
                </div>
                {isOpenBurgerLink && (
                  <ul className="sm-link-container">
                    <li>
                      <Link className="route-link" to="/">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="route-link" to="/search">
                        Search
                      </Link>
                    </li>
                    <li>
                      <Link className="route-link" to="/my-profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="logout-btn"
                        type="button"
                        onClick={this.onHandleLogout}
                      >
                        Logout
                      </button>
                    </li>
                    <li>
                      <button
                        className="sm-nav-link-cancel-btn"
                        type="button"
                        onClick={this.setBurgerLinkStatus}
                      >
                        <MdCancel />
                      </button>
                    </li>
                  </ul>
                )}
              </div>

              <div className="lg-navbar-container">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dwdkfnsrg/image/upload/v1682340256/Group_7807_ocbveq.png"
                    alt="website logo"
                  />
                </Link>
                <ul className="lg-link-container">
                  <Link style={{textDecoration: 'none'}} to="/search">
                    <li className="search">
                      <input
                        value={search}
                        type="search"
                        placeholder="Search Caption"
                        onChange={onHandleChangeSearch}
                      />
                      <button
                        className="search-btn"
                        type="button"
                        data-testid="searchIcon"
                        onClick={onSearch}
                      >
                        <FaSearch />
                      </button>
                    </li>
                  </Link>
                  <li>
                    <Link className="route-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="route-link" to="/my-profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="logout-btn"
                      type="button"
                      onClick={this.onHandleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}
export default withRouter(Navbar)
