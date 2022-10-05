import React from 'react'
import './Hero.css'
import { NavLink } from 'react-router-dom'

const Hero = ({slogan, description, buttonText}) => {
  return (
    <section className='hero'>
       <h1 className='h-slogan'>{slogan}</h1>
       <p className='h-description'>{description}</p>
       <NavLink to='/stories' className='btn h-btn'>{buttonText}</NavLink>
    </section>
  )
}

export default Hero