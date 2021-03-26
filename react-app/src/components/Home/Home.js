import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import * as memberActions from "../../store/member"
import { useDispatch, useSelector } from 'react-redux';
import Search from "../buttons/Search/Search";
import "./Home.css"

const Home = () => {
    const [query, setQuery] = useState('');

    return (
        <div className="home container flex flex-col m-auto flex-nowrap">
            <style>{'body { background-color: navy; }'}</style>
            <div className="flex ">
                <Search />
            </div>
            <div className="container flex p-10 m-auto space-x-10 m-auto justify-around flex-nowrap">
                <Link to="/rosters/create" className="link border-black bg-gray-500 p-5 rounded cursor-pointer">
                    Add new Roster
                </Link>
                    <Link to="/members/create" className="link border-black bg-gray-500 p-5 rounded cursor-pointer">
                    Add to Database
                </Link>
                    <Link to="/rosters/assign" className="link border-black bg-gray-500 p-5 rounded cursor-pointer">
                    Assign to Roster!
                </Link>
            </div>
            <br></br>
            <div className="flex p-10 m-auto">
                <Link to="/members/unassigned" className="link border-black bg-gray-500 p-5 rounded cursor-pointer">Unassigned</Link>
            </div>

       </div>
    )
}

export default Home