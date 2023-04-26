import Loader from 'react-loader-spinner'

const Spinner = () => (
  <>
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={100} width={100} />
    </div>
  </>
)

export default Spinner
