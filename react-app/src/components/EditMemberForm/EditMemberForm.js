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
                <br></br>
                <form className="self-center m-auto" onSubmit={onSubmit}>
                    <h1 className="text-left p-1 text-center bg-gray-200">Edit {prevName}</h1>
                    {/* <span contentEditable="true"> */}
                    <div className="flex flex-col p-2">
                        <label className="text-left p-1 text-left" htmlFor="email">Name</label>
                        <input
                            className="border-black p-4 text-center bg-gray-100 w-full"
                            type="text"
                            placeholder={prevName}
                            defaultValue={name}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>

                    <div className="flex flex-col p-2">
                        <label className="text-left p-1 text-left" htmlFor="email">Notes</label>
                        <input
                                className="border-black p-4 text-center bg-gray-100 w-full"
                                contentEditable="true"
                                type="text"
                                placeholder={prevNotes}
                                defaultValue={notes}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                    </div>
                    <br></br>
                    <button type="submit" className="bg-blue-400 p-1 m-4 rounded hover:bg-blue-900 w-6/12">Edit</button>
                </form>
            </>}
        </div>
    );

};

export default EditMemberForm