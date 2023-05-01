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

class UserProfile extends Component {
  state = {
    profileDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchUserProfile()
  }

  fetchUserProfile = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')

    const userUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(userUrl, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.setState({
        profileDetails: {...data.user_details},
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
              <img className="profile-story-img" src={each.image} alt="story" />
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
          <p className="user-name-heading">{profileDetails.user_name}</p>
          <div>
            <img
              className="user-profile"
              src={profileDetails.profile_pic}
              alt="my profile"
            />
            <div>
              <h1>{profileDetails.posts_count}</h1>
              <p>posts</p>
            </div>
            <div>
              <h1>{profileDetails.followers_count}</h1>
              <p>followers</p>
            </div>
            <div>
              <h1>{profileDetails.following_count}</h1>
              <p>following</p>
            </div>
          </div>
          <div className="sm-user-text">
            <h1>{profileDetails.user_name}</h1>
            <p>{profileDetails.user_bio}</p>
          </div>
        </div>

        <div className="lg-profile-header-container">
          <img src={profileDetails.profile_pic} alt="my profile" />
          <div className="lg-profile-text-container">
            <h1>{profileDetails.user_name}</h1>
            <div>
              <div>
                <p>{profileDetails.posts_count} posts</p>
              </div>
              <div>
                <p>{profileDetails.followers_count} followers</p>
              </div>
              <div>
                <p>{profileDetails.following_count} following</p>
              </div>
            </div>
            <p className="lg-user-name">{profileDetails.user_name}</p>
            <p className="lg-user-description">{profileDetails.user_bio}</p>
          </div>
        </div>
        {renderStories()}
        <hr className="line" />
        <div className="post-heading-container">
          <BsGrid3X3 className="grid" />
          <p>Posts</p>
        </div>
        {renderPosts()}
      </>
    )
  }

  renderFailureView = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return <FailurePage path={`/users/${id}`} />
  }

  renderUserProfile = () => {
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
        <div className="profile-container">{this.renderUserProfile()}</div>
      </>
    )
  }
}

export default UserProfile
