import React, { useEffect, useState } from 'react';
import * as memberActions from "../../store/member"
import { useDispatch, useSelector } from 'react-redux';
import "./Database.css"

const Database = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const { getMembers } = memberActions;
    const everybody = useSelector((state) => state.member.member);

    useEffect(() => {
        dispatch(getMembers(everybody)).then(() => setLoaded(true))
    }, [getMembers])

    return (
        <div className="flex">
            <table className="border-black m-auto">
                <thead className="bg-gray-200 p-4">
                    <tr>
                        <th colSpan="3">
                            Your Database
                        </th>
                    </tr>
                </thead>
                <tbody className="border-black">
                {loaded && Object.values(everybody).map((member) => {
                    return (
                        <tr className="border-black">
                            <td className="border-black">
                                <a href={`/members/${member.id}`} className="border-black">
                                    {member.name}
                                </a>
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

export default Database;