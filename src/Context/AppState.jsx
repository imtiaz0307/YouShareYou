import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import AppContext from './AppContext'

const host = 'http://localhost:5000'

const AppState = (props) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedDescription, setEditedDescription] = useState('')
  const [data, setData] = useState([])
  const [currentUserId, setCurrentUserId] = useState('')
  const [editPostId, setEditPostId] = useState()
  const loginEmail = useRef()
  const loginPassword = useRef()
  const signupEmail = useRef()
  const signupPassword = useRef()
  const username = useRef()
  const addStoryTitle = useRef()
  const addStoryDescription = useRef()


  const getAllPosts = async () => {
    const response = await fetch(`${host}/feed/posts`)
    const jsonData = await response.json()
    jsonData && setData(jsonData.data)
  }

  const currentUser = async () => {
    const response = await fetch(`${host}/auth/getuser`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage?.getItem('token')
      }
    })
    const data = await response.json()
    setCurrentUserId(data?.user?._id)
  }

  const signUp = async () => {
    const response = await fetch(`${host}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username.current.value, email: signupEmail.current.value, password: signupPassword.current.value })
    });
    const data = await response.json()
    data.token && localStorage.setItem('token', data.token)
    getAllPosts()
    currentUser()
    return data
  }

  const login = async () => {
    const response = await fetch(`${host}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: loginEmail.current.value, password: loginPassword.current.value })
    });
    const data = await response.json()
    data.token && localStorage.setItem('token', data.token)
    getAllPosts()
    currentUser()
    return data
  }


  const deletePost = async (id) => {
    const response = await fetch(`${host}/feed/deletepost/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const data = await response.json()
    return data
  }

  const createPost = async () => {
    const response = await fetch(`${host}/feed/createpost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title: addStoryTitle.current.value, description: addStoryDescription.current.value })
    })
    const data = await response.json()
    getAllPosts()
    return data
  }

  const editPost = async (id) => {
    const response = await fetch(`${host}/feed/editpost/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title: editedTitle, description: editedDescription })
    })
    const data = await response.json()
    setShowEditModal(false)
    getAllPosts()
    return data
  }




  return (
    <AppContext.Provider value={{ currentUser, openMenu, setOpenMenu, loginEmail, loginPassword, signupEmail, signupPassword, username, getAllPosts, signUp, login, data, currentUserId, deletePost, addStoryDescription, addStoryTitle, createPost, showEditModal, setShowEditModal, editedTitle, setEditedTitle, editedDescription, setEditedDescription, editPost, editPostId, setEditPostId }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState