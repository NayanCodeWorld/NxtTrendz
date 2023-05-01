import {Component} from 'react'

import {FaSearch} from 'react-icons/fa'

import Cookies from 'js-cookie'

import Navbar from '../Navbar'
import Spinner from '../Spinner'
import FailurePage from '../FailurePage'
import PostItem from '../PostItem'

import SearchContext from '../../context/SearchContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const token = Cookies.get('jwt_token')
class SearchPage extends Component {
  state = {
    postData: [],
    apiStatus: apiStatusConstants.initial,
  }

  fetchSearchData = async search => {
    this.setState({
      apiStatus: apiStatusConstants.progress,
    })

    const url = `https://apis.ccbp.in/insta-share/posts?search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const newData = data.posts.map(each => ({
      ...each,
      like_status: false,
    }))

    if (response.ok === true) {
      this.setState({
        postData: [...newData],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeLikeStatus = id => {
    const {postData} = this.state
    // console.log(id)
    // console.log(postList)
    const changeData = postData.map(each => {
      if (each.post_id === id) {
        // console.log(each)
        if (each.like_status === false) {
          return {
            ...each,
            like_status: !each.like_status,
            likes_count: each.likes_count + 1,
          }
        }
        return {
          ...each,
          like_status: !each.like_status,
          likes_count: each.likes_count - 1,
        }
      }
      return each
    })

    this.setState({
      postData: changeData,
    })
  }

  renderInitialView = () => (
    <div className="Initial-view-container">
      <img
        src="https://res.cloudinary.com/dwdkfnsrg/image/upload/v1682777396/Insta%20login%20Page/Frame_1473_lyr0yp.png"
        alt="search"
        className="search"
      />
      <p>Search Results will be appear here</p>
    </div>
  )

  renderSuccessView = () => {
    const {postData} = this.state
    if (postData.length === 0) {
      return (
        <div className="search-not-found-container">
          <img
            src="https://res.cloudinary.com/dwdkfnsrg/image/upload/v1682856529/Group_stcmny.png"
            alt="not found"
          />
          <h1>Search Not Found</h1>
          <p>Try different keyword or search again</p>
        </div>
      )
    }
    return (
      <ul className="postsList-container">
        {postData.map(eachPost => (
          <li className="post-container" key={eachPost.post_id}>
            <PostItem
              details={eachPost}
              onChangeLikeStatus={this.onChangeLikeStatus}
            />
          </li>
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div>
      <FailurePage />
    </div>
  )

  renderProgressView = () => (
    <div>
      <Spinner />
    </div>
  )

  renderSearchData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      case 'PROGRESS':
        return this.renderProgressView()
      default:
        return this.renderInitialView()
    }
  }

  render() {
    return (
      <SearchContext.Consumer>
        {value => {
          const {search, changeSearch} = value
          const onChangeSearch = event => changeSearch(event.target.value)

          const onSearch = () => {
            console.log(search)
            this.fetchSearchData(search)
          }

          return (
            <>
              <Navbar fetchSearchData={this.fetchSearchData} />
              <div className="search-sm-main-container">
                <div className="search-container">
                  <input
                    value={search}
                    type="search"
                    placeholder="Search Caption"
                    onChange={onChangeSearch}
                  />
                  <button type="button" onClick={onSearch}>
                    <FaSearch />
                  </button>
                </div>
                <div className="main-container">{this.renderSearchData()}</div>
              </div>
              <div className="search-lg-main-container">
                <h1>Search Results</h1>
                <div className="lg-main-container">
                  {this.renderSearchData()}
                </div>
              </div>
            </>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default SearchPage
