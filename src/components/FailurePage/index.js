import {Link} from 'react-router-dom'

import './index.css'

const FailurePage = props => {
  const {path} = props
  return (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dwdkfnsrg/image/upload/v1682856507/Group_7737_js1ktp.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <Link to={path}>
        <button type="button">Try again</button>
      </Link>
    </div>
  )
}

export default FailurePage
