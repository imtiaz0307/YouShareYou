import { useEffect, useContext } from 'react'
import AddStory from '../Components/Story/AddStory/AddStory'
import Story from '../Components/Story/Story'
import AppContext from '../Context/AppContext'

const Stories = () => {
  const { data, getAllPosts } = useContext(AppContext)
  const reversed = data.reverse()
  useEffect(() => {
    getAllPosts()
  }, [])
  return (
    <div className="feed">
      {localStorage.getItem('token') && <AddStory />}
      <h1 className='stories-posts-head'>Fellow Community Member's Posts</h1>
      <div className="stories">
        {
          data.length > 0 ?
            reversed.map((elem, index) => {
              return (
                 <Story details={elem} key={index} />
              )
            })
            : <p>No Stories To Show</p>
        }
      </div>
    </div>
  )
}

export default Stories