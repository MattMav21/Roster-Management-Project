import React, { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom"
import * as memberActions from "../../store/member"
import { useDispatch, useSelector } from 'react-redux';
// import * as UserActions from '../../store/'
import "./LandingPage.css"


const LandingPage = ({authenticated, setAuthenticated}) => {
    const dispatch = useDispatch();
    if (authenticated) {
        return <Redirect to="/home" />;
    }

    return (
        <>
        <div className="splash-page flex flex-col h-screen w-screen">
            <div className="container absolute m-auto bg-gray-800 top-20 w-6/12 left-52">
                <div className="bg-blue-800 text-white rounded">
                    <h1 className="font-bold text-center">ROSTER MANAGEMENT</h1>
                </div>
                    <h2 className="text-center">Manage your roster today!</h2>
            </div>
        </div>
        {/* // <div className="container flex m-auto flex-nowrap">
        //     <div className="container flex p-10 m-auto space-x-10 m-auto justify-around flex-nowrap">
        //         <Link to="/rosters/create" className="border-black bg-gray-500 p-5 rounded cursor-pointer">
        //             Create a new roster!
        //             </Link>
        //         <Link to="/members/create" className="border-black bg-gray-500 p-5 rounded cursor-pointer">
        //             Add member to database!
        //             </Link>
        //         <Link to="/rosters/assign" className="border-black bg-gray-500 p-5 rounded cursor-pointer">
        //             Assign a member to your roster!
        //             </Link>
        //     </div>
        // </div> */}
        </>
    )
}

export default LandingPage