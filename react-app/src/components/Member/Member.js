import React, { useEffect, useState } from 'react';
import * as memberActions from "../../store/member"
import { useDispatch, useSelector } from 'react-redux';
import "./Member.css"
import { useParams } from 'react-router-dom';
import EditMemberButton from '../buttons/EditMemberButton';
import Checkbox from '../buttons/Checkbox';
import AddProperties from '../buttons/AddProperties';

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
            {loaded && everybody &&
                <div className="container roster flex flex-col border-black m-auto">
                <div className="relative left-24 flex justify-left w-4/12">
                    <EditMemberButton />
                    <AddProperties />
                </div>
                <table className="border-black m-auto layout-fixed">
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
                                    <td colSpan="3" className="border-b-0 font-bold">Rosters:</td>
                                </tr>
                        {Object.values(everybody.roster_in).length ? Object.values(everybody.roster_in).map((roster) => {
                                        return (
                                            <tr className="border-black border-r">
                                            <td colSpan="3" className="border-0">
                                                <li>
                                                    {<a className="border-black text-blue-600 hover:underline" href={`/rosters/${roster.id}`}>{roster.name}</a>}
                                                </li>
                                            </td>
                                            </tr>
                                        )
                                    }) :
                                        <tr className="border-black border-r">
                                            <td className="border-t-0 border-b-0 border-r">
                                                None
                                            </td>
                                        </tr>
                        }
                        <tr colSpan="3">
                            <td colSpan="3" className="font-bold border-0 border-r">Properties:</td>
                        </tr>

                        
                        {Object.values(everybody.properties).length ? 
                       
                            Object.values(everybody.properties).map((property) => {
                                return (
                                    <tr colSpan="3" className="container relative border-black border-r overflow-auto">
                                        {/* <td colSpan="1" className="border-0">
                                            <div className="relative left-4"> */}
                                            {/* </div>
                                        </td> */}
                                        <td className="border-t-0 border-l-0 border-b-0">
                                                <Checkbox
                                                    memberId={memberId} 
                                                    // propertyObj={Object.values(everybody.properties)} 
                                                    propObj={Object.values(everybody.properties).filter((p) => p.id === property.id)}  
                                                /> 
                                            {/* <div className="relative top-1.5 px-4 right-2"> */}
                                                {property.name}
                                            {/* </div> */}
                                        </td>
                                    </tr>
                                )
                            })
                        : 
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