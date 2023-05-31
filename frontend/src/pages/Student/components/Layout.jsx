import React from 'react'
import SideBar from './SideBar';


function Layout({children}) {
  return (
    <div className=' flex overflow-hidden w-screen bg-[#9BA4B5]'>
        <SideBar />
        <div className='flex-1 flex flex-col'>
            {children}
        </div>
    </div>
  )
}

export default Layout;