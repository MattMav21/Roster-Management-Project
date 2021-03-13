import React, { useEffect, useState } from 'react';
import * as rosterActions from "../../store/roster"
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import "./Database.css"
// import DeleteMemberButton from '../buttons/DeleteMemberButton';

const SearchResults = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const { query } = useParams();
    console.log(query)
    const { searchEverything } = rosterActions;
    const matchingData = useSelector((state) => state.roster.roster);
    debugger

    useEffect(() => {
        dispatch(searchEverything(query)).then(() => setLoaded(true))
    }, [searchEverything])

    console.log(matchingData.matching_members)

    return (
        loaded &&
        <div className="flex">
        <h1>Search Results for "{query}":</h1>
        <h2>Members:</h2>
            <table className="border-black m-auto pb-4">
                <thead className="bg-gray-200 p-4">
                    <tr>
                        <th colSpan="3">
                            Members:
                        </th>
                    </tr>
                </thead>
                <tbody className="border-black">
                    {loaded && Object.values(matchingData.matching_members).map((member) => {
                        debugger
                        return (
                            <tr className="border-black">
                                <td className="border-black">
                                    <>
                                        <a href={`/members/${member.id}`} className="border-black">
                                            {member.name}
                                        </a>
                                    </>
                                </td>
                                <td className="border-black">{member.notes}</   td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );

};

export default SearchResults;