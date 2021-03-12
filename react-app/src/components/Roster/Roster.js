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
        <div className="flex">
        {loaded && roster &&
                <div className="border-black m-auto">
                <EditRosterButton />
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
                    {/* <tr className="border-black" colSpan="3"> */}
                    {Object.values(roster.this_roster).map((member) => {
                        //try making a table row for each
                        return (
                            <tr className="border-r border-black">
                                <td className="flex border-0 border-r justify-between" colSpan="3">
                                        <Link colSpan="2" to={`/members/${member.id}`}>
                                            {member.name}
                                        </Link>
                                        <div className="flex relative left-4 space-x-2">
                                            <div className="relative">
                                            <UnassignButton roster_name={roster.name} this_member={Object.values(roster.this_roster).filter((data) => member.id === data.id)} />
                                            </div>
                                        </div>
                                    </td>
                            </tr>
                    )})}
                    </tbody>
                </table>
        </div>
        }
        </div>
    );

};

export default Roster