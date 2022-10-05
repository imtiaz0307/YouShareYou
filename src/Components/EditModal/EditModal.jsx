import React from 'react'
import { useContext } from 'react'
import AppContext from '../../Context/AppContext'
import './EditModal.css'

const EditModal = () => {
    const { showEditModal, setShowEditModal, editedTitle, setEditedTitle, editedDescription, setEditedDescription, editPost, editPostId } = useContext(AppContext)

    return (
        <>
            {
                showEditModal && (
                    <div className="edit-modal-wrapper">
                        <p className="closeModal" onClick={() => setShowEditModal(false)}><i className="fa-solid fa-x"></i></p>
                        <div className='edit-modal'>
                            <h1 className='e-m-h'>Edit Your Story</h1>
                            <form className='e-m-f' onSubmit={(e) => {
                                e.preventDefault()
                                editPost(editPostId)
                            }}>
                                <label htmlFor="edit-title">Edit the title</label>
                                <input type="text" value={editedTitle} id='edit-title' onChange={(e) => setEditedTitle(e.target.value)} required minLength={5} maxLength={40} />
                                <label htmlFor="edit-description">Edit the description</label>
                                <textarea value={editedDescription} id='edit-description' onChange={(e) => setEditedDescription(e.target.value)} required minLength={20} />
                                <button type='submit' className='btn modal-btn'>Update</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default EditModal