import {useState} from 'react'

import {Link} from 'react-router-dom'

import {GiHamburgerMenu} from 'react-icons/gi'
import {MdCancel} from 'react-icons/md'
import {FaSearch} from 'react-icons/fa'

import './index.css'

const Navbar = () => {
  const [isOpenBurgerLink, setBurgerLinkStatus] = useState(false)

  return (
    <nav className="navbar-bg-container">
      <div className="sm-navbar-container">
        <div className="sm-navbar-btn-container">
          <div>
            <img
              src="https://res.cloudinary.com/dwdkfnsrg/image/upload/v1682340256/Group_7807_ocbveq.png"
              alt="website logo"
            />
          </div>
          <button type="button" onClick={() => setBurgerLinkStatus(true)}>
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
              <button className="logout-btn" type="button">
                Logout
              </button>
            </li>
            <li>
              <button
                className="sm-nav-link-cancel-btn"
                type="button"
                onClick={() => setBurgerLinkStatus(false)}
              >
                <MdCancel />
              </button>
            </li>
          </ul>
        )}
      </div>
      <div className="lg-navbar-container">
        <img
          src="https://res.cloudinary.com/dwdkfnsrg/image/upload/v1682340256/Group_7807_ocbveq.png"
          alt="website logo"
        />
        <ul className="lg-link-container">
          <li className="search">
            <input type="search" placeholder="Search Caption" />
            <button
              className="search-btn"
              type="button"
              data-testid="searchIcon"
            >
              <FaSearch />
            </button>
          </li>
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
            <button className="logout-btn" type="button">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
