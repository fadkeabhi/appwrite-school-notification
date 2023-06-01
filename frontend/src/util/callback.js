import { Client, Account } from "appwrite";
import instance from './instance';
import { callbackBackend, getAppWriteProjectId } from '../API/Routes';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Callback() {
    const navigate = useNavigate();

    async function nav() {
        let appWriteId = ''
        await instance.get(getAppWriteProjectId)
            .then((e) => {
                appWriteId = e.data.projectId
            })
            .catch((err) => {
                console.log(err)
            })


        const client = new Client();
        const account = new Account(client);
        client
            .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
            .setProject(appWriteId) // Your project ID
        account.getSession('current')
            .then((response) => {
                console.log(response)
                instance.post(callbackBackend, {
                    userId: response.userId,
                    sessionId: response.$id
                })
                    .then((e) => {
                        console.log(e.data)
                        if (e.data.role === 'admin') {
                            navigate("/admin");
                        }
                        else if (e.data.role === 'teacher') {
                            navigate("/teacher");
                        }
                        else if (e.data.role === 'student' || e.data.role === 'parent') {
                            navigate("/dash");
                        }
                        else{
                            navigate("/");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }


    useEffect(() => {
        nav()
    }, [])




    return (
        <div>
        </div>
    );
}


export default Callback