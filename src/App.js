import React from 'react'
import NavBar from './Components/ui/navbar/NavBar'
import Banner from './Components/ui/banner/Banner'
import Post from './Components/ui/post/Post'
import Category from './Components/ui/post/Category'
import TvShow from './Components/ui/post/TvShow'

function App() {
  return (
    <div >
        <Banner/>
        <NavBar/>
         <Post/>
         <Category/>
         <TvShow/>
    </div>
  )
}

export default App
