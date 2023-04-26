import {useState, useEffect} from 'react'

import Cookies from 'js-cookie'

import Navbar from '../Navbar'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [apiStoriesResponse, setApiStoriesResponse] = useState({
    status: apiStatusConstants.initial,
    storiesList: [],
  })

  useEffect(() => {
    const fetchStories = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const storiesUrl = 'https://apis.ccpb.in/insta-share/posts'
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(storiesUrl, options)
      const data = await response.json()
      console.log(response)
      console.log(data)
    }
    fetchStories()
  })

  const renderStories = () => <h1>slider</h1>

  return (
    <>
      <Navbar />
      <div className="home-bg-container">
        <div className="stories-container">{renderStories()}</div>
      </div>
    </>
  )
}

export default Home
