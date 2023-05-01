import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dwdkfnsrg/image/upload/v1682784624/Insta%20login%20Page/erroring_1_jdw3yo.png"
      alt="page not found"
    />
    <h1>PAGE NOT FOUND</h1>
    <p>we are sorry, the page you requested could not be found</p>

    <Link to="/">
      <button type="button">Home Page</button>
    </Link>
  </div>
)

export default NotFound
