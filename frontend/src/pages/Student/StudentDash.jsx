import React, { useEffect, useState } from 'react'
import Layout from './components/Layout';
import { useNavigate } from 'react-router-dom';
import Feed from './Feed'


function StudentDash({ props }) {
    const [user, setUser] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        setUser(props.user)

    }, []);
    if (user.role !== "student" && user.role !== "parent") {
        navigate('/')
    }
    console.log(user)

    return (
        <Layout>
            <div className='bg-white items-center justify-center m-8 mb-0 flex rounded-lg'>
                <p className='p-4 text-2xl font-semibold'>{user?.email}</p>
            </div>
            <div className='bg-white flex-1 m-8 flex rounded-lg'>

            </div>
        </Layout>
    )
}

export default StudentDash;