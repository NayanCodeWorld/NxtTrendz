import Loader from 'react-loader-spinner'

import './index.css'

const Spinner = () => (
  <>
    <div className="loader-container spinner-container">
      <Loader type="TailSpin" color="#4094EF" width={40} height={40} />
    </div>
  </>
)

export default Spinner
