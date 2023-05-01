import './index.css'

const StoryItem = props => {
  const {storyDetail} = props
  return (
    <div className="story-item">
      <img
        className="slider-img"
        src={storyDetail.story_url}
        alt="user story"
      />
      <p className="slider-text">{storyDetail.user_name}</p>
    </div>
  )
}
export default StoryItem
