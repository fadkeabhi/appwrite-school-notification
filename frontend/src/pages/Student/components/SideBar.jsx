import React from 'react'
import { useNavigate } from 'react-router';
import { logOutRoute } from '../../../API/Routes'
import instance from '../../../util/instance'
import Notification from './Notification';

//Novu In App Notification


function SideBar() {
    const navigate = useNavigate();

    const logOutHandler = async (e) => {
        const { data } = await instance.get(logOutRoute, {});
        navigate('/');
    }

    return (

        <div className='flex self-start top-0 h-screen overflow-hidden items-center justify-between flex-col p-6 bg-[#212A3E]'>



            <div className='flex flex-col gap-6 text-xl'>
                <Notification />
                <button onClick={() => navigate('/dash/')} className='flex px-3 py-2 w-[150px] rounded-lg bg-[#9BA4B5] gap-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                    <p>FEED</p>
                </button>
            </div>
            <div className='flex flex-col text-xl'>
                <button onClick={logOutHandler} className='flex w-[150px] px-3 py-2 rounded-lg bg-[#9BA4B5] gap-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    <p>Logout</p>
                </button>
            </div>
        </div>

    )
}

export default SideBar;