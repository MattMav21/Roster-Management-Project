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
                <div className="splash-container container relative m-auto bg-gray-900 bottom-32 opacity-95 w-6/12 rounded">
                <div className="bg-blue-800 text-yellow-600 rounded p-6">
                    <h1 className="font-bold text-center opacity-100">ROSTER MANAGEMENT</h1>
                    <h2 className="text-center">Manage your roster today!</h2>
                </div>
                    <div className="">
                        <h3 className="p-12 text-white text-center">You have a group of people to manage? We've got you covered!</h3>
                        <div className="flex justify-around mb-8">
                            <a href="/sign-up" className="">
                                <div className="p-4 bg-blue-800 hover:bg-gray-700 hover:text-yellow-700 hover:font-bold rounded">
                                    <h1>Login</h1>
                                </div>
                            </a>
                            <div>
                                <a href="/sign-up" className="">
                                    <div className="p-4 bg-blue-800 hover:bg-gray-700 hover:text-yellow-700 hover:font-bold rounded">
                                        <h1>Join Us!</h1>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
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