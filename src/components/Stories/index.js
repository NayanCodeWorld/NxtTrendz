import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import StoryItem from '../StoryItem'

import './index.css'
import Spinner from '../Spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
}
class Stories extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    storiesList: [],
  }

  componentDidMount() {
    this.fetchPosts()
  }

  fetchPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const postUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(postUrl, options)
    const data = await response.json()
    // console.log(response)
    // console.log(data)
    if (response.ok === true) {
      this.setState({
        storiesList: data.users_stories,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {storiesList} = this.state
    return (
      <>
        <Slider {...settings}>
          {storiesList.map(eachItem => (
            <div className="slider-item" key={eachItem.user_id}>
              <StoryItem storyDetail={eachItem} />
            </div>
          ))}
        </Slider>
      </>
    )
  }

  renderFailureView = () => <h1>failure</h1>

  renderProgressView = () => (
    <div style={{width: '100%', height: '100%'}} data-textid="loader">
      <Spinner />
    </div>
  )

  renderStories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return this.renderProgressView()
    }
  }

  render() {
    return <div className="slick-container">{this.renderStories()}</div>
  }
}

export default Stories
