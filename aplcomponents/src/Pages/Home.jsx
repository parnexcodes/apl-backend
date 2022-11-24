import React from 'react'
import Navbar from '../Components/Navbar'
import Slider from '../Components/Slider'
import Stripe from '../Components/stripe'
import TeamSlider from '../Components/TeamSlider'
import Heading from '../Components/Heading'
import TeamsHeader from '../Components/TeamsHeader'

function Home() {
  return (
  <>
  <Stripe />
  <Navbar/>
  <Slider/>
  <TeamsHeader/>
  <TeamSlider/>
  <Heading/>
  </>
  )
}

export default Home