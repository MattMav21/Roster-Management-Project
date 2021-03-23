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

    useEffect(() => {
        dispatch(searchEverything(query)).then(() => setLoaded(true))
    }, [searchEverything])

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    return (
        loaded && matchingData &&
        <div className="flex flex-col">
        <div className="pb-4 m-auto font-bold">
            <h1>Search Results for "{query}":</h1>
        </div>

            <div className="pb-12">
            <table className="border-black m-auto pb-4">
                <thead className="bg-gray-200 p-4">
                    <tr>
                            <th className="border-black bg-blue-700 text-white" colSpan="3">
                            Members:
                        </th>
                    </tr>
                </thead>
                <tbody className="border-black">
                    {isEmpty(matchingData.matching_members) ? <td>No Results</td> : Object.values(matchingData.matching_members).map((member) => {
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

            <div className="pb-12">
            <table className="border-black m-auto pb-4">
                <thead className="bg-gray-200 p-4">
                    <tr>
                            <th className="border-black bg-blue-700 text-white" colSpan="3">
                            Rosters:
                        </th>
                    </tr>
                </thead>
                <tbody className="border-black">
                    {isEmpty(matchingData.matching_rosters) ? <td>No Results</td> :  Object.values(matchingData.matching_rosters).map((roster) => {
                        return (
                            <tr className="border-black">
                                <td className="border-black">
                                    <>
                                        <a href={`/rosters/${roster.id}`} className="border-black">
                                            {roster.name}
                                        </a>
                                    </>
                                </td>
                                <td className="border-black">{roster.notes}</   td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </div>
    );

};

export default SearchResults;