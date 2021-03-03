import React, { useEffect, useState } from 'react';
import * as rosterActions from "../../store/roster"
import { useDispatch, useSelector } from 'react-redux';
import "./Roster.css"
import { useParams } from 'react-router-dom';

const Roster = () => {
    const [loaded, setLoaded] = useState(false);
    const { rosterId } = useParams()
    const dispatch = useDispatch();
    const { getOneRoster } = rosterActions;
    const roster = useSelector((state) => state.roster.roster);
    console.log(roster)

    useEffect(() => {
        dispatch(getOneRoster(rosterId)).then(() => setLoaded(true))
    }, [getOneRoster])

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
                            <td className="border-black">{roster.notes}</   td>
                        </tr>

                    </tbody>
                </table>
            }
        </div>
    );

};

export default Roster