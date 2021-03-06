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
    const { searchEverything } = rosterActions;
    const matchingData = useSelector((state) => state.roster.roster);

    useEffect(() => {
        dispatch(searchEverything(query)).then(() => setLoaded(true))
    }, [searchEverything])

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }


    let matchingProps;
    let capturedProps = [];

    if (matchingData !== undefined) {
        matchingProps = Object.values(matchingData.matching_properties)
        
        matchingProps.map((prop) => {
            if (!capturedProps.includes(prop.name)) {
                capturedProps.push(prop.name)
            }
        })
    }
    
    return (
        loaded && matchingData && capturedProps &&
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
                                        <a href={`/members/${member.id}`} className="text-blue-600 hover:underline">
                                            {member.name}
                                        </a>
                                    </>
                                </td>
                                <td className="border-black">{member.notes}</td>
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
                                        <a href={`/rosters/${roster.id}`} className="text-blue-600 hover:underline">
                                            {roster.name}
                                        </a>
                                    </>
                                </td>
                                <td className="border-black">{roster.notes}</td>
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
                                Properties:
                        </th>
                        </tr>
                    </thead>
                    <tbody className="border-black">

                        {capturedProps.length === 0 ? <td>No Results</td> : 
                        
                            capturedProps.map((prop) => {

                               return (
                                   <>
                                        <tr className="border-black">
                                            <td colSpan="3" className="border-black text-center">
                                                 {prop}
                                            </td>
                                        </tr>
                                    <>

                                    <tr>
                                        <td className="column w-6/12 text-center bg-green-400 border-b font-bold">
                                            True
                                            <tr className="border-0 bg-green-400">
                                                {Object.values(matchingData.true_data).length ? 
                                                    Object.values(matchingData.true_data).filter((array) => array[3] === prop).map((filteredArray) => {
                                                        return (
                                                            <div>
                                                                <td className="border-0">
                                                                    <a className="border-black text-blue-600 hover:underline" href={`/members/${filteredArray[0]}`}> 
                                                                        {filteredArray[1]}
                                                                    </a>
                                                                </td>
                                                            </div>
                                                        )})
                                                : <li>None</li>}
                                            </tr>
                                        </td>

                                        <td className="column w-6/12 text-center bg-red-400 border-b font-bold">
                                            False
                                            <tr className="border-0 bg-red-400">
                                                {Object.values(matchingData.false_data).length ?
                                                    Object.values(matchingData.false_data).filter((array) => array[3] === prop).map((filteredArray) => {
                                                        return (
                                                            <div>
                                                                <td className="border-0">
                                                                    <a className="border-black text-blue-600 hover:underline" href={`/members/${filteredArray[0]}`}>
                                                                        {filteredArray[1]}
                                                                    </a>
                                                                </td>
                                                            </div>
                                                        )})
                                                    : <li>None</li>}
                                            </tr>
                                        </td>
                                    </tr>        
                                </>
                            </>
                        )})}





                    </tbody>
                </table>
            </div>

        </div>
    );

};

export default SearchResults;