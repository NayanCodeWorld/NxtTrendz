import {Component} from 'react'
import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import {IoIosWarning} from 'react-icons/io'

import Spinner from '../Spinner'

import PostItem from '../PostItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const jwtToken = Cookies.get('jwt_token')

class PostsList extends Component {
  state = {
    postList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchPosts()
  }

  fetchPosts = async () => {
    const postUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(postUrl, options)
    const data = await response.json()

    const newData = data.posts.map(each => ({...each, like_status: false}))

    // console.log(data)
    // console.log(newData)

    if (response.ok === true) {
      this.setState({
        postList: [...newData],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeLikeStatus = id => {
    const {postList} = this.state
    // console.log(id)
    // console.log(postList)
    const changeData = postList.map(each => {
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
      postList: changeData,
    })
  }

  renderSuccessView = () => {
    const {postList} = this.state
    return (
      <ul className="postsList-container">
        {postList.map(eachPost => (
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
    <div className="failure-post-view">
      <IoIosWarning className="warning-img" />
      <p>Something went wrong. Please try again</p>
      <Link to="/">
        <button type="button">Try again</button>
      </Link>
    </div>
  )

  renderPost = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return (
          <div className="process-container" data-testid="loader">
            <Spinner />
          </div>
        )
    }
  }

  render() {
    return <>{this.renderPost()}</>
  }
}

export default PostsList
