import React, { useEffect, useState } from 'react';
import * as memberActions from "../../store/member"
import { useDispatch, useSelector } from 'react-redux';
import "./Member.css"
import { useParams } from 'react-router-dom';
import EditMemberButton from '../buttons/EditMemberButton';

const Member = () => {
    const [loaded, setLoaded] = useState(false);
    const { memberId } = useParams()
    const dispatch = useDispatch();
    const { getOneMember } = memberActions;
    const everybody = useSelector((state) => state.member.member);

    useEffect(() => {
        dispatch(getOneMember(memberId)).then(() => setLoaded(true))
    }, [getOneMember])

    return (
        <div className="flex">
            {loaded &&
                <div className="border-black m-auto">
                <EditMemberButton />
                <table className="border-black m-auto">
                    <thead className="bg-gray-200 p-4">
                        <tr>
                            <th colSpan="3">
                                {everybody.name}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="border-black">
                                <tr className="border-black">
                                    <td className="border-black text-center">{everybody.notes}</td>
                                </tr>
                                    {everybody.roster_in !== [] ? everybody.roster_in.map((roster) => {
                                        return (
                                            <tr>
                                                <td className="flex border-0 border-r justify-between">
                                                    {roster}
                                                </td>
                                            </tr>
                                        )
                                    }) : <tr>None</tr>}
                    </tbody>
                </table>
                </div>
            }
        </div>
    );

};

export default Member