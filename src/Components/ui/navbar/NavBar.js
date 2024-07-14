import React from 'react'

function NavBar() {
  return (
    <div className="fixed top-0 w-full h-14 px-5 flex justify-between items-center ">
            <img className="fixed left-5 w-20" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix Logo"/>
            <img className="fixed right-5 w-8 rounded-[20px]" src="skin.jpg" alt="Avatar"/>
        </div>
  )
}

export default NavBar
