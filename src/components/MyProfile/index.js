import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsGrid3X3} from 'react-icons/bs'
import {AiFillCamera} from 'react-icons/ai'

import Navbar from '../Navbar'
import Spinner from '../Spinner'
import FailurePage from '../FailurePage'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {
    profileDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchMyProfile()
  }

  fetchMyProfile = async () => {
    const token = Cookies.get('jwt_token')
    const myProfileUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(myProfileUrl, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      this.setState({
        profileDetails: {...data.profile},
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {profileDetails} = this.state

    const renderStories = () => {
      const {stories} = profileDetails
      return (
        <ul className="profile-stories-container">
          {stories.map(each => (
            <li className="profile-story" key={each.id}>
              <img
                className="profile-story-img"
                src={each.image}
                alt="my story"
              />
            </li>
          ))}
        </ul>
      )
    }

    const renderPosts = () => {
      const {posts} = profileDetails
      if (posts.length === 0) {
        return (
          <div className="profile-no-post-container">
            <div>
              <AiFillCamera />
              <h1>No Posts Yet</h1>
            </div>
          </div>
        )
      }
      return (
        <ul className="profile-post-container">
          {posts.map(each => (
            <li className key={each.id}>
              <img src={each.image} alt="my post" />
            </li>
          ))}
        </ul>
      )
    }

    return (
      <>
        <div className="sm-profile-header-container">
          <h1 className="user-name-heading">{profileDetails.user_name}</h1>
          <div>
            <img
              className="user-profile"
              src={profileDetails.profile_pic}
              alt="my profile"
            />
            <ul>
              <li>
                {profileDetails.posts_count}
                <p>posts</p>
              </li>
              <li>
                {profileDetails.followers_count}
                <p>followers</p>
              </li>
              <li>
                {profileDetails.following_count}
                <p>following</p>
              </li>
            </ul>
          </div>
          <div className="sm-user-text">
            <p>{profileDetails.user_id}</p>
            <p>{profileDetails.user_bio}</p>
          </div>
        </div>

        <div className="lg-profile-header-container">
          <img src={profileDetails.profile_pic} alt="my profile" />
          <div className="lg-profile-text-container">
            <h1>{profileDetails.user_name}</h1>
            <ul>
              <li>
                <p>{profileDetails.posts_count} posts</p>
              </li>
              <li>
                <p>{profileDetails.followers_count} followers</p>
              </li>
              <li>
                <p>{profileDetails.following_count} following</p>
              </li>
            </ul>
            <p className="lg-user-name">{profileDetails.user_name}</p>
            <p className="lg-user-description">{profileDetails.user_bio}</p>
          </div>
        </div>
        {renderStories()}
        <hr className="line" />
        <div className="post-heading-container">
          <BsGrid3X3 className="grid" />
          <h1>Posts</h1>
        </div>
        {renderPosts()}
      </>
    )
  }

  renderFailureView = () => <FailurePage path="/my-profile" />

  renderMyProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return (
          <div>
            <Spinner />
          </div>
        )
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="profile-container">{this.renderMyProfile()}</div>
      </>
    )
  }
}

export default MyProfile
