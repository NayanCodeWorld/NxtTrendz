import {Link} from 'react-router-dom'

import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import Cookies from 'js-cookie'

import './index.css'

const jwtToken = Cookies.get('jwt_token')

const PostItem = props => {
  const {details, onChangeLikeStatus} = props

  const {comments} = details
  const renderComment = () => (
    <ul className="comment-container">
      {comments.map(eachComment => (
        <li className="comments" key={eachComment.user_id}>
          <p>
            <span>{eachComment.user_name}</span>
            {eachComment.comment}
          </p>
        </li>
      ))}
    </ul>
  )

  // handle Like status
  const onHandleLikeStatus = async () => {
    const likePostUrl = `https://apis.ccbp.in/insta-share/posts/${details.post_id}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        like_status: true,
      }),
    }
    const response = await fetch(likePostUrl, options)
    if (response.ok === true) {
      onChangeLikeStatus(details.post_id)
    }
  }

  // on Handle unLike
  const onHandleUnlikeStatus = async () => {
    const likePostUrl = `https://apis.ccbp.in/insta-share/posts/${details.post_id}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        like_status: false,
      }),
    }
    const response = await fetch(likePostUrl, options)
    if (response.ok === true) {
      onChangeLikeStatus(details.post_id)
    }
  }

  // render Like button
  const renderLikeButton = () => {
    if (details.like_status === true) {
      return (
        <button
          type="button"
          data-testid="likeIcon"
          onClick={onHandleLikeStatus}
        >
          <FcLike />
        </button>
      )
    }
    return (
      <button
        type="button"
        data-testid="unLikeIcon"
        onClick={onHandleUnlikeStatus}
      >
        <BsHeart />
      </button>
    )
  }

  return (
    <>
      <Link className="router-link" to={`/users/${details.user_id}`}>
        <div className="post-profile-container">
          <div>
            <img src={details.profile_pic} alt="post author profile" />
          </div>
          <p>{details.user_name}</p>
        </div>
      </Link>
      <img
        className="post-img"
        src={details.post_details.image_url}
        alt="post"
      />
      <div className="like-comment-share-container">
        {renderLikeButton()}
        <div>
          <FaRegComment />
        </div>
        <div>
          <BiShareAlt />
        </div>
      </div>
      <div className="post-details-container">
        <p className="like-text">{details.likes_count} likes</p>
        <p className="post-description">{details.post_details.caption}</p>
        {renderComment()}
        <p className="post-time">{details.created_at}</p>
      </div>
    </>
  )
}

export default PostItem
