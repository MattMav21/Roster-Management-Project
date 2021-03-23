import React, { useEffect, useState } from 'react';
import * as rosterActions from "../../store/roster"
import * as memberActions from "../../store/member"
import { useDispatch, useSelector } from 'react-redux';
import "./Roster.css"
import { useParams } from 'react-router-dom';
import UnassignButton from '../buttons/UnassignButton';
import { Link } from 'react-router-dom'
import EditRosterButton from '../buttons/EditRosterButton';
import DeleteRosterButton from '../buttons/DeleteRosterButton';

const Roster = () => {
    const [loaded, setLoaded] = useState(false);
    const { rosterId } = useParams()
    const dispatch = useDispatch();
    const { getOneRoster } = rosterActions;
    const { getMembers } = memberActions;
    const roster = useSelector((state) => state.roster.roster);

    useEffect(() => {
        dispatch(getOneRoster(rosterId)).then(() =>
        dispatch(getMembers()))
        .then(() => setLoaded(true))
    }, [getOneRoster])
    
    return (
        <div className="flex m-auto">
        {loaded && roster &&
                <div className="container roster flex flex-col border-black m-auto">
                <EditRosterButton />
                <table className="black m-auto">
                    <thead className="p-6">
                        <tr>
                            <th className="border-black bg-blue-700 text-white" colSpan="3">
                                {roster.name}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="border-black">
                        <tr className="subheading border-black">
                            <td className="p-4 border-black text-center font-bold" colSpan="3">{roster.notes}</td>
                        </tr>
                    {/* <tr className="border-black" colSpan="3"> */}
                        {Object.values(roster.this_roster).length ? Object.values(roster.this_roster).map((member) => {
                        //try making a table row for each
                        return (
                            <tr className="border-black border-r">
                                    <td colSpan="3" className="border-0">
                                        <UnassignButton roster_name={roster.name} this_member={Object.values(roster.this_roster).filter((data) => member.id === data.id)} />
                                        <a href={`/members/${member.id}`} className="border-black text-blue-600 hover:underline">
                                            {member.name}
                                        </a>
                                    <div className="">
                                    </div>
                                    </td>
                            </tr>
                            )
                        }) : <td colSpan="3" className="text-center">This roster has no members.</td> }
                    </tbody>
                </table>
        </div>
        }
        </div>
    );

};

export default Roster