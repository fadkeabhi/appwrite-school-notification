import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import AllPost from './Teacher/AllPost';
import CreatePost from './Teacher/CreatePost';
import NavbarTeacher from './Teacher/NavbarTeacher';

function TeacherDash({user}) {
    const navigate = useNavigate();
  return (
    <div className='bg-[#F1F6F9]'>
        <div className='flex relative flex-col h-screen w-screen overflow-hidden'>
            <NavbarTeacher user={user} /> 
            <div className='flex-1 flex flex-col items-center overflow-hidden p-5 justify-center'>
                <AllPost />
                <CreatePost />
            </div>
        </div>
    </div>
  )
}

export default TeacherDash;