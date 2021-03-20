import React, { useEffect, useState } from 'react';
import * as rosterActions from "../../store/roster"
import { useDispatch, useSelector } from 'react-redux';
import "./AllRosters.css"
import DeleteRosterButton from '../buttons/DeleteRosterButton';

const AllRosters = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const { getRosters } = rosterActions;
    const everyRoster = useSelector((state) => state.roster.roster);    

    useEffect(() => {
        dispatch(getRosters(everyRoster)).then(() => setLoaded(true))
    }, [getRosters])

    return (
        <div className="flex mb-10">
            <table className="black m-auto">
                <thead className="p-6">
                    <tr className="border-black">
                        <th className="border-black bg-blue-700 text-white p-6" colSpan="2">
                            Your Rosters
                        </th>
                    </tr>
                </thead>
                <tbody className="border-black">
                    <tr className="subheading border-black">
                        <td className="p-4 border-black text-center font-bold" colSpan="1">Rosters</td>
                        <td className="p-4 border-black text-center font-bold" colSpan="1">Notes</td>
                    </tr>
                    {loaded && Object.values(everyRoster).map((roster) => {
                        return (
                            <tr className="border-black">
                                <td className="border-black">{
                                    <>
                                    <DeleteRosterButton rosterId={roster.id} rosterName={roster.name} />
                                    <a href={`/rosters/${roster.id}`} className="border-black text-blue-600 hover:underline">
                                        {roster.name}
                                    </a>
                                </>
                                }</td>
                                <td className="border-black">{roster.notes}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );

};

export default AllRosters;