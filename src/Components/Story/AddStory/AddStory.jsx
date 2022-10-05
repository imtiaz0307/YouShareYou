import React from 'react'
import { useContext } from 'react'
import AppContext from '../../../Context/AppContext'
import './AddStory.css'

const AddStory = () => {
    const { addStoryTitle, addStoryDescription, createPost } = useContext(AppContext)
    return (
        <div className="add-story-wrapper">
            <h1>Share Your Story With The Community.</h1>
            <form className='add-story' onSubmit={(e) => {
                e.preventDefault()
                createPost()
                addStoryTitle.current.value = addStoryDescription.current.value = ''
                }}>
                <label htmlFor="add-story-title">Title of your Story {'(Keep it short.)'}</label>
                <input type="text" placeholder='Add your title' ref={addStoryTitle} id='add-story-title' className='add-story-title' required minLength={5} maxLength={40} /> 

                <label htmlFor="add-story-description">Your Story</label>
                <textarea ref={addStoryDescription} id='add-story-description' placeholder='Description of your story' className='add-story-description' required minLength={20}></textarea>
                <button className='btn add-story-btn' type='submit'>Post Story</button>
            </form>
        </div>
    )
}

export default AddStory