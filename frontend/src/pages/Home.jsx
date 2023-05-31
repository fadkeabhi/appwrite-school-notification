import React from 'react'
import { googleCheckInRoute, callback, frontend, getAppWriteProjectId } from '../API/Routes';
import R from "../assets/R.png";
import { Client, Account } from "appwrite";
import instance from '../util/instance';

function Home(props) {
    const GoogleAuth = () => {
        let appWriteId = ""

        instance.get(getAppWriteProjectId)
            .then((e) => {
                appWriteId = e.data.projectId

                const client = new Client()
                    .setEndpoint('https://cloud.appwrite.io/v1')
                    .setProject(appWriteId);

                const account = new Account(client);

                // account.createOAuth2Session({provider:'google',success:callback,failure:frontend});
                account.createOAuth2Session('google', callback, frontend);


            })
            .catch((err) => {
                console.log(err)
            })




    }
    return (
        <div className=" flex items-center h-screen bg-[#FFB4B4] justify-center">
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-3xl p-10 text-[#212A3E] font-bold tracking-[15px]'>SCHOOL MANAGEMENT SYSTEM</h1>
                <button onClick={GoogleAuth} className="flex rounded-md bg-[#BA94D1] animate-pulse ring-[#7F669D] px-4 gap-10 tracking-[10px] p-2 hover:ring-4" >
                    <img src={R} className='h-10 w-10' />
                    <h1 className='font-bold text-2xl'>CLICK HERE TO SIGN IN</h1>
                </button>
            </div>
        </div>
    )
}

export default Home;