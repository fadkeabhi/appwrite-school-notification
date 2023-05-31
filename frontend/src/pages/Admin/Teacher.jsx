import React, { useEffect, useState } from 'react'
import Layout from './components/Layout';
import { useNavigate } from 'react-router';
import instance from '../../util/instance';
import { getTeacherRoute } from '../../API/Routes';

function Teacher() {
    const [teachersDetails, setTeacherDetails] = useState([]);
    const navigate = useNavigate();
    const getData = async () => {
        const {data} = await instance.get(getTeacherRoute);
        setTeacherDetails(data);
    }
    useEffect(()=>{
        getData();
    },[]);
  return (
    <Layout>
        <div className='flex-1 flex flex-col bg-white m-8 rounded-lg overflow-hidden'>
            <div className='flex p-5 w-full items-center justify-center text-lg font-medium gap-4'>
                <button onClick={()=>{navigate('/admin/teacher/add')}} className='flex px-3 py-2 rounded-lg bg-[#9BA4B5] gap-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>
                    <p>Add</p>
                </button>
            </div>
            <div className='flex-1 overflow-x-hidden overflow-y-auto'>
                <div className='grid text-white md:grid-cols-3 xl:grid-cols-4 p-3 grid-cols-1 gap-4 overflow-x-hidden overflow-y-auto'>
                {
                    teachersDetails.map((teacher)=>(
                        <div className='flex bg-[#394867] drop-shadow-lg rounded-md'>
                            <div key={teacher._id} className='flex-1 text-white text-lg font-semibold flex flex-col p-4 rounded-md'>
                                <p>{teacher.email}</p>
                                <p>{`${teacher.fName} ${teacher.lName}`}</p>
                                <p>{teacher.phone}</p>
                                {
                                    teacher.class.map((cl)=>(
                                        <div key={cl} className='flex p-2 gap-5'>
                                            <div className='bg-white text-black p-2 px-4 rounded-lg'>{cl}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <button
                             onClick={()=>{
                                navigate(`/admin/teacher/edit?id=${teacher._id}&email=${teacher.email}`)
                            }} className='flex drop-shadow-lg items-center justify-center px-5 text-black '>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 rounded-md h-10 p-1 bg-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                            
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Teacher;