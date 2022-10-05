import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AppContext from '../../Context/AppContext'
import './Navbar.css'

const Navbar = () => {
  const { openMenu, setOpenMenu, getAllPosts } = useContext(AppContext)
  return (
    <header className='header'>
      <NavLink to='/' className="logo">YouShareYou</NavLink>
      <nav className="navbar">
        <div className="hamburger" onClick={() => setOpenMenu(!openMenu)}>
          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="line line-3"></div>
        </div>
        <ul className={`mainMenu ${!openMenu && 'menuClosed'}`}>
          <div className="closeMenu" onClick={() => setOpenMenu(!openMenu)}><i className="fa-solid fa-x"></i></div>
          <li><NavLink to='/' onClick={() => setOpenMenu(!openMenu)}>Home</NavLink></li>
          <li><NavLink to='/stories' onClick={() => setOpenMenu(!openMenu)}>Stories</NavLink></li>
          <li><NavLink to='/about' onClick={() => setOpenMenu(!openMenu)}>About Us</NavLink></li>
          {
            !localStorage.getItem('token')
            ?
            <li><NavLink to='/login' className='btn'>Login</NavLink></li>
            :
            <button className='btn' style={{fontSize: '1rem'}} onClick={() => {
              setOpenMenu(!openMenu)
              localStorage.removeItem('token')
              window.location.replace('/login')
                getAllPosts()
            }}>Logout</button>
          }
        </ul>
      </nav>
    </header>
  )
}

export default Navbar