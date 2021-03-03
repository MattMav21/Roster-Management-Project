import React, { useEffect, useState } from 'react';
import * as rosterActions from "../../store/roster"
import * as memberActions from "../../store/member"
import { useDispatch, useSelector } from 'react-redux';
import "./Roster.css"
import { useParams } from 'react-router-dom';

const Roster = () => {
    const [loaded, setLoaded] = useState(false);
    const { rosterId } = useParams()
    const dispatch = useDispatch();
    const { getOneRoster } = rosterActions;
    const { getMembers } = memberActions;
    const roster = useSelector((state) => state.roster.roster);
    const rosterMembers = useSelector((state) => state.member.member)
    // const rosterMembers = useSelector((state) => state.roster.roster.this_roster)
    console.log(roster)
    // if (rosterMembers !== undefined) {
    //     console.log(rosterMembers)
    // }

    useEffect(() => {
        dispatch(getOneRoster(rosterId)).then(() =>
            dispatch(getMembers()))
            .then(() => setLoaded(true))
    }, [getOneRoster])

    console.log(rosterMembers)

    return (
        <div className="flex">
            {loaded &&
                <table className="border-black m-auto">
                    <thead className="bg-gray-200 p-4">
                        <tr>
                            <th colSpan="3">
                                {roster.name}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="border-black">
                        <tr className="border-black">
                            <td className="border-black">{roster.notes}</td>
                        </tr>
                        

                    </tbody>
                </table>
            }
        </div>
    );

};

export default Roster