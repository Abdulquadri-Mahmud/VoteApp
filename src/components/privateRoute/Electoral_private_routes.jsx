import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function Electoral_private_routes() {
    const { currentElectorial } = useSelector((state) => state.electorial);

    return currentElectorial ? <Outlet/> : <Navigate to={'/electorial-login'}/>
}
