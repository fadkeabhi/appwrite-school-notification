import React, { useEffect, useState } from 'react'
import Layout from './components/Layout';
import { useNavigate } from 'react-router';
import instance from '../../util/instance';
import { getFeedStudentRoute } from '../../API/Routes';
import {format} from "timeago.js";


function FeedElement(props) {
    return (
        <div className='flex bg-[#394867] rounded-md'>
            <div className='flex-1 text-white text-lg flex flex-col p-4 rounded-md'>
                <p className='font-bold text-[#394867] text-center flex-1 flex flex-col bg-white m-2 rounded-lg'>{props.feed.title}</p>
                <p>{props.feed.content}</p>
                {format(props.feed.createdAt)}
            </div>
        </div>
    )
}


function Feed(props) {
    const [feeds, setFeeds] = useState([]);
    const navigate = useNavigate();
    const getData = async () => {
        const { data } = await instance.get(getFeedStudentRoute);
        console.log(data)
        setFeeds(data);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <Layout>
            <div className='bg-white items-center justify-center m-8 mb-0 flex rounded-lg'>
                <p className='p-4 text-3xl font-semibold'>{props?.user?.role==='student' ? 'STUDENT DASHBOARD' : 'PARENT DASHBOARD'} </p>
            </div>
            <div className='bg-white items-center justify-center m-8 mb-0 flex rounded-lg'>
                <p className='p-4 text-2xl font-semibold'>{props?.user?.role==='student' ? props?.user?.email : props?.user?.parentEmail} </p>
            </div>
            <div className='flex-1 flex flex-col bg-white m-8 rounded-lg'>
                <div className='flex-1'>
                    <div className='grid text-white p-3 md:grid-cols-1 xl:grid-cols-1 gap-4 overflow-x-hidden overflow-y-auto'>
                        {
                            feeds.map((feed) => (
                                <FeedElement feed={feed} key={feed._id} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Feed;