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
        <div className="flex m-auto">
            {loaded &&
                <div className="container roster flex flex-col border-black m-auto">
                <EditMemberButton />
                <table className="border-black m-auto">
                    <thead className="p-6">
                        <tr className="border-black bg-blue-700 text-white p-6">
                            <th colSpan="3">
                                {everybody.name}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="border-black">
                                <tr className="subheading border-black">
                                    <td colSpan="3" className="border-black text-center">{everybody.notes}</td>
                                </tr>
                                <tr colSpan="3">
                            <td className="border-b-0">Rosters:</td>
                                </tr>
                                   {everybody.roster_in.length ? everybody.roster_in.map((roster) => {
                                        return (
                                            <tr className="border-black border-r">
                                            <td colSpan="3" className="border-0">
                                                <li>{roster}</li>
                                            </td>
                                            </tr>
                                        )
                                    }) :
                                        <tr className="border-black border-r">
                                            <td colSpan="3" className="border-0">
                                                None
                                            </td>
                                        </tr>
                                    }
                    </tbody>
                </table>
                </div>
            }
        </div>
    );

};

export default Member