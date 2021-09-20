import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {socket} from '../../api/index'

const Main = () => {

    const {user} = useSelector(state => state.user);

    useEffect(() => {
        console.log(socket)
    },[socket])


    return (
        <div>
            Main
        </div>
    )

}

export default Main