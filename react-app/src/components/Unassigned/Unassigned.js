import React, { useEffect, useState } from 'react';
import * as memberActions from "../../store/member"
import { useDispatch, useSelector } from 'react-redux';
// import "./Database.css"
import DeleteMemberButton from '../buttons/DeleteMemberButton';

const Unassigned = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const { getUnassignedMembers } = memberActions;
    const everybody = useSelector((state) => state.member.member);

    useEffect(() => {
        dispatch(getUnassignedMembers(everybody)).then(() => setLoaded(true))
    }, [getUnassignedMembers])

    return (
        <div className="flex">
            <table className="border-black m-auto">
                {loaded && Object.values(everybody).length ? 
                <>
                <thead className="bg-gray-200 p-4">
                    <tr>
                        <th className="border-black bg-red-700 text-white p-6" colSpan="2">
                            These people are not assigned to a roster.
                        </th>
                    </tr>
                </thead>
                <tbody className="border-black">
                    <tr className="bg-red-200 border-black">
                        <td className="p-4 border-black text-center font-bold" colSpan="1">Person</td>
                        <td className="p-4 border-black text-center font-bold" colSpan="1">Notes</td>
                    </tr>
                    {loaded && Object.values(everybody).map((member) => {
                        return (
                            <tr className="border-black">
                                <td className="border-black">
                                    <>
                                        <DeleteMemberButton memberId={member.id} memberName={member.name} />
                                        <a href={`/members/${member.id}`} className="border-black text-blue-600 hover:underline">
                                            {member.name}
                                        </a>
                                    </>
                                </td>
                                <td className="border-black">{member.notes}</   td>
                            </tr>
                        )
                    })}
                </tbody>
                    </> : 
                    <thead className="bg-gray-200 p-4">
                        <tr>
                            <th className="border-black bg-green-700 text-white p-6" colSpan="2">
                                Everybody in the database has been assigned!
                            </th>
                        </tr>
                    </thead>
                }
            </table>
        </div>
    );

};

export default Unassigned;