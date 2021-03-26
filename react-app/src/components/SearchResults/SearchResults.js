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

    let true_properties, 
    true_mp, true_members,
    false_properties, false_mp,
    false_members

    if (matchingData !== undefined) {
        true_properties = matchingData.true_props;
        true_mp = matchingData.true_mps;
        true_members = matchingData.true_members_object;
        false_properties = matchingData.false_props;
        false_mp = matchingData.false_mps;
        false_members = matchingData.false_members_object;


        const true_prop_ids = Object.values(true_properties).map((property) => {
            return property.id
        })
        const false_prop_ids = Object.values(false_properties).map((property) => {
            return property.id
        })

        let true_member_prop = [];
        let false_member_prop = [];

        Object.values(true_mp).map((mp) => {
            if (true_prop_ids.includes(mp.property_id)) {
                true_member_prop.push(mp.member_id)
            }
            return true_member_prop;
        })

        Object.values(false_mp).map((mp) => {
            if (false_prop_ids.includes(mp.property_id)) {
                false_member_prop.push(mp.member_id)
            }
            return false_member_prop;
        })

        console.log(true_member_prop)
        console.log(false_member_prop)
        
        console.log(true_prop_ids, false_prop_ids)
    }

    console.log(true_properties,
        true_mp, true_members,
        false_properties, false_mp,
        false_members)





    console.log(matchingData)

    useEffect(() => {
        dispatch(searchEverything(query)).then(() => setLoaded(true))
    }, [searchEverything])

    console.log(matchingData)

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
                                        <a href={`/members/${member.id}`} className="text-blue-600 hover:underline">
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

            {/* <div className="pb-12">
                <table className="border-black m-auto pb-4">
                    <thead className="bg-gray-200 p-4">
                        <tr>
                            <th className="border-black bg-blue-700 text-white" colSpan="3">
                                Properties:
                        </th>
                        </tr>
                    </thead>
                    <tbody className="border-black">
                        {isEmpty(matchingData.matching_properties) ? <td>No Results</td> : Object.values(matchingData.matching_properties).map((property) => {
                            return (
                                <>
                                <tr className="border-black">
                                        <td colSpan="3" className="border-black text-center">
                                        {property.name}
                                    </td>
                                </tr>
                                    <tr>
                                        <td className="column w-6/12 text-center bg-green-500 border-b">
                                            True
                                            <tr className="border-0 bg-green-500">
                                                {Object.values(matchingData.true_members_object).length ? Object.values(matchingData.true_members_object).map((true_member) => {
                                                    return (<li>{true_member.name}</li>)
                                                }) : <h1>No Results</h1> }
                                            </tr>
                                        </td>

                                        <td className="column w-6/12 text-center bg-red-500">
                                            False
                                            <tr className="border-0 bg-red-500"><li>lads</li></tr>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div> */}

        </div>
    );

};

export default SearchResults;