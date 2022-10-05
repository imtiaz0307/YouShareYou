import React from 'react'
import { useRef } from 'react'
import { useContext } from 'react'
import AppContext from '../../Context/AppContext'
import EditModal from '../EditModal/EditModal'
import './Story.css'

const Story = ({ details }) => {
  const { currentUserId, deletePost, getAllPosts, setShowEditModal, setEditedTitle, setEditedDescription, setEditPostId } = useContext(AppContext)
  const story = useRef()
  return (
    <>
      <div className='story' ref={story}>
        <div className="story-details">
          <div className="story-top">
            <p className='story-user'>Posted by: {details[0].username}</p>
            {details[1].user === currentUserId && (
              <div className="story-delete-edit">
                <p className='edit-story' onClick={() => {
                  setShowEditModal(true)
                  console.log(details[1]._id)
                  setEditedTitle(details[1].title)
                  setEditedDescription(details[1].description)
                  setEditPostId(details[1]._id)
                }}><i className="fa-solid fa-pen-to-square"></i></p>
                <p className='delete-story' onClick={() => {
                  let confirmation = window.confirm('Are you sure you want to delete this post?')
                  confirmation && deletePost(details[1]._id) && story.current.remove() && getAllPosts()
                }}><i className="fa-sharp fa-solid fa-trash"></i></p>
              </div>
            )}
          </div>
          <p className='story-time'>{details[1].postedAt.split('T')[0]}</p>
          <p className="story-title">{details[1].title}</p>
          <p className='story-description'>{details[1].description}</p>
        </div>
      </div>
      <EditModal/>
    </>
  )
}

export default Story