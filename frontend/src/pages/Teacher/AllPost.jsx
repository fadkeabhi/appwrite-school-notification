import React, { useEffect, useState } from 'react'
import instance from '../../util/instance';
import { GetPostRoute } from '../../API/Routes';
import {format} from "timeago.js";

function AllPost() {
  const [posts,setPosts] = useState(null);
  const getPosts = async() => {
    const {data} = await instance.get(GetPostRoute);
    if(!posts){
      setPosts(data);
    }
    
  }
  useEffect(()=>{
    getPosts();
  },[posts])
  return (
    <div className='flex-1 grid grid-cols-1 sm:grid-cols-3 gap-5 justify-center items-start overflow-x-hidden over-y-auto h-full w-full'>
        {
          posts?.map((pos)=>(
            <div key={pos._id} className='bg-white flex flex-row p-5 shadow-xl rounded-md'>
              <div className='flex-1 flex flex-col'>
                <h1 className='text-lg font-medium'>{pos.title}</h1>
                <p>{pos.content}</p>
              </div>
              <div className='flex items-end justify-center'>
                <p className=''>{format(pos.createdAt)}</p>
              </div>
            </div>
          ))
        }
        
    </div>
  )
}

export default AllPost;