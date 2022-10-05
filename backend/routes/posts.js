import express from 'express'
import fetchuser from '../middleware/fetchuser.js'
const router = express.Router()
import Post from './../models/Post.js'
import User from '../models/User.js'


// getting all posts
router.get('/posts', async (req, res) =>{
    const posts = await Post.find()
    let data =[]
    for(let i = 0; i < posts.length; i++) {
        let user = await User.findById(posts[i].user)
        data.push([user, posts[i]])
    }

    res.json({data})
})

// creating new post
router.post('/createpost', fetchuser, async (req, res) => {
    const {title, description} = req.body;
    const userId = req.user.id

    const post = await Post.create({
        user: userId,
        title,
        description
    })
    post.save()
    res.send(post)
})

// editing the selected post
router.put('/editpost/:id', fetchuser, async (req, res) => {
    const {title, description} = req.body;
    const editedPost = {}

    if(title) editedPost.title = title
    if(description) editedPost.description = description
    
    let post = await Post.findById(req.params.id)
    if(!post) res.json({error: 'No Post Found.'})

    if(req.user.id !== post.user.toString()) res.json({error: 'Access Denied'})

    post = await Post.findByIdAndUpdate(req.params.id, {$set: editedPost}, {new: true}) 

    res.send(post)
})

// delete selected post
router.delete('/deletepost/:id', fetchuser, async (req, res) => {
    let post = await Post.findById(req.params.id)
    if(!post) res.json({error: `Couldn't find the post.`})

    if(req.user.id !== post.user.toString()) res.json({error: 'Access denied!'})

    post = await Post.findByIdAndDelete(req.params.id)

    res.json({post, success: 'Post deleted successfully.'})
})

// post like increase will be added soon
router.put('/likedpost/:id', fetchuser, async (req, res) => {
    let post = await Post.findById(req.params.id)
    const likedPost = await Post.updateOne({id: req.params.id},{
        $set: {
            likes: post.likes +1
        }
    })
    res.json({likedPost, post})
})
export default router