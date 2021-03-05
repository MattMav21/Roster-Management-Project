import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import * as memberActions from "../../store/member"
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    return (
       <div className="container flex m-auto">
        <div className="container flex justify-space-between p-5 m-auto">
            <div className="p-10 m-10 space-x-10 m-auto">
                <Link to="/rosters/create" className="border-black bg-gray-500 p-5 rounded cursor-pointer">
                    Create a new roster!
                </Link>
                    <Link to="/members/create" className="border-black bg-gray-500 p-5 rounded cursor-pointer">
                    Add member to database!
                </Link>
                    <Link to="/rosters/assign" className="border-black bg-gray-500 p-5 rounded cursor-pointer">
                    Assign a member to your roster!
                </Link>
            </div>
        </div>
       </div>
    )
}

export default Home