import {
    NovuProvider,
    PopoverNotificationCenter,
    NotificationBell,
    IMessage,
} from '@novu/notification-center'
import instance from '../../../util/instance';
import { getStudentKeyRoute } from '../../../API/Routes';
import { useState , useEffect} from 'react'


function Notification() {

    const [key, setKey] = useState({})

    function onNotificationClick(message) {
        // your logic to handle the notification click
        if (message?.cta?.data?.url) {
            window.location.href = message.cta.data.url;
        }
    }

    const getKey = async () => {
        const {data} = await instance.get(getStudentKeyRoute);
        setKey(data)
        console.log(data)
    }

    useEffect(()=>{
        getKey();
    },[]);


    return (
        <NovuProvider subscriberId={key?.email} subscriberHash={key?.hash} applicationIdentifier={'VTnr0IxURO0h'}>
            <PopoverNotificationCenter onNotificationClick={onNotificationClick}>
                {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
            </PopoverNotificationCenter>
        </NovuProvider>
    )
}

export default Notification