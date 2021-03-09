import React, { useEffect, useState } from 'react';
import * as memberActions from "../../store/member"
import { useDispatch, useSelector } from 'react-redux';
import "./EditMemberForm.css"
import { useHistory, useParams } from 'react-router-dom';
import EditMemberButton from '../buttons/EditMemberButton';

const EditMemberForm = () => {
    const [loaded, setLoaded] = useState(false);
    const { memberId } = useParams()
    const dispatch = useDispatch();
    const { getOneMember, editMember } = memberActions;
    const history = useHistory();
    
    const everybody = useSelector((state) => state.member.member);
    
    let prevName;
    let prevNotes;
    
    if (everybody !== undefined) {
        prevName = everybody.name;
        prevNotes = everybody.notes;
    }
    
    const [name, setName] = useState(prevName)
    const [notes, setNotes] = useState(prevNotes)
    
    useEffect(() => {
        dispatch(getOneMember(memberId)).then(() => setLoaded(true))
    }, [getOneMember])


    const onSubmit = (e) => {
        e.preventDefault()
        const editedMember = {
            name: name,
            notes: notes,
            memberId: memberId
        }
        debugger
        console.log(editedMember)
        return dispatch(editMember(editedMember))
        .then(() => history.push(`/members/${memberId}`))
        console.log(editedMember)
    }

    return (
        <div className="flex m-auto border-black text-center flex-col w-9/12">
            {loaded && prevName && prevNotes &&
                <>
                <h1 className="m-auto">Edit {prevName}</h1>
                <br></br>
                <form className="border-black m-auto flex flex-col w-6/12 p-8" onSubmit={onSubmit}>
                    {/* <span contentEditable="true"> */}
                    <input
                        className="bg-gray-200 border-black p-4 text-center w-full"
                        type="text"
                        placeholder={prevName}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* </span> */}
                        {/* <input
                            className="bg-gray-200 p-8 center w-full"
                            type="text"
                            placeholder={prevName}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        /> */}
                    <input
                        contentEditable="true"
                        className="border-black p-8 grid overflow-hidden text-center"
                        type="text"
                        placeholder={prevNotes}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                        {/* <input
                                className="bg-gray-200 p-8 center w-full"
                                type="text"
                                placeholder={prevName}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            /> */}
                    {/* <div className="border-black overflow-visible w-full">
                            <textarea
                                className="border-black"
                                type="text"
                                placeholder={prevNotes}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                    </div> */}
                    <br></br>
                    <button type="submit" className="bg-blue-400 rounded hover:bg-blue-900 w-6/12">Edit</button>
                </form>
            </>}
        </div>
    );

};

export default EditMemberForm