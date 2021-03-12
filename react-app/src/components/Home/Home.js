import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import * as memberActions from "../../store/member"
import { useDispatch, useSelector } from 'react-redux';
import Search from "../buttons/Search/Search";

const Home = () => {
    const [query, setQuery] = useState('');

    return (
        <div className="container flex flex-col m-auto flex-nowrap">
            <div className="flex ">
                <Search />
            </div>
            <div className="container flex p-10 m-auto space-x-10 m-auto justify-around flex-nowrap">
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
            <br></br>
            <div className="flex p-10 m-auto">
                <Link to="/members/unassigned" className="border-black bg-gray-500 p-5 rounded cursor-pointer">These People Need A Home</Link>
            </div>

       </div>
    )
}

export default Home