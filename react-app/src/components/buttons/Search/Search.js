import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import * as rosterActions from "../../../store/roster"
import * as memberActions from "../../../store/member"
import "./Search.css";

const Search = () => {
    const [query, setQuery] = useState('');
    const history = useHistory();

    const { searchEverything } = rosterActions;

    const dispatch = useDispatch();


    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(searchEverything(query))
        .then(() => history.push(`/rosters/search/${query}`))     
    }
        
    


    return (
        <div className="search-bar m-auto">
            <form className="container search-form m-auto flex flex-nowrap" method="get" onSubmit={onSubmit}>
                <div className="w-full relative m-0.5">
                    <input
                        className="search-field w-96 rounded p-1.5 focus:bg-blue-300"
                        placeholder="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="m-0.5">
                    <button className="search-button rounded text-gray-700 p-2 bg-blue-400 hover:shadow-xl hover:text-yellow-300" type="submit">Search</button>
                </div>
            </form>

        </div>
    )
}

export default Search;