import React, { useEffect, useState } from 'react';
import * as rosterActions from "../../store/roster"
import { useDispatch, useSelector } from 'react-redux';
import "./AllRosters.css"

const AllRosters = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const { getRosters } = rosterActions;
    const everyRoster = useSelector((state) => state.roster.roster);

    debugger
    
    if (everyRoster !== undefined) {
        console.log(everyRoster)
    }

    useEffect(() => {
        dispatch(getRosters(everyRoster)).then(() => setLoaded(true))
    }, [getRosters])

    return (
        <div className="flex">
            <table className="border-black m-auto">
                <thead className="bg-gray-200 p-4">
                    <tr>
                        <th colSpan="3">
                            Your Rosters
                        </th>
                    </tr>
                </thead>
                <tbody className="border-black">
                    {loaded && Object.values(everyRoster).map((roster) => {
                        return (
                            <tr className="border-black">
                                <td className="border-black">{roster.name}</    td>
                                <td className="border-black">{roster.notes}</   td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );

};

export default AllRosters;