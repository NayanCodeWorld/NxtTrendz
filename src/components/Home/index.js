import {Component} from 'react'

import Navbar from '../Navbar'
import PostsList from '../PostsList'
import Stories from '../Stories'

import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="home-bg-container">
          <div className="stories-container">
            <Stories />
          </div>
          <hr className="sm-hr-line" />
          <div className="posts-container">
            <PostsList />
          </div>
        </div>
      </>
    )
  }
}

export default Home
