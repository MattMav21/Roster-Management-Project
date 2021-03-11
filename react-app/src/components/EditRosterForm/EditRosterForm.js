import React, { useEffect, useState } from 'react';
import * as rosterActions from "../../store/roster"
import { useDispatch, useSelector } from 'react-redux';
// import "./EditMemberForm.css"
import { useHistory, useParams } from 'react-router-dom';
// import EditMemberButton from '../buttons/EditMemberButton';

const EditRosterForm = () => {
    const [loaded, setLoaded] = useState(false);
    const { rosterId } = useParams();
    const dispatch = useDispatch();

    //make editRoster action
    const { getOneRoster, editRoster } = rosterActions;
    const history = useHistory();

    const everybody = useSelector((state) => state.roster.roster);

    let prevName;
    let prevNotes;

    if (everybody !== undefined) {
        prevName = everybody.name;
        prevNotes = everybody.notes;
    }

    const [name, setName] = useState(prevName)
    const [notes, setNotes] = useState(prevNotes)

    useEffect(() => {
        dispatch(getOneRoster(rosterId)).then(() => setLoaded(true))
    }, [getOneRoster])


    const onSubmit = (e) => {
        e.preventDefault()
        const editedRoster = {
            name: name,
            notes: notes,
            rosterId: rosterId
        }
        return dispatch(editRoster(editedRoster)).then(() => history.push(`/rosters/${rosterId}`))
    }

    return (
        <div className="flex m-auto border-black text-center flex-col p-2">
            {loaded && prevName && prevNotes &&
                <>
                    <br></br>
                <form className="self-center m-auto w-full" onSubmit={onSubmit}>
                    <h1 className="text-left p-1 text-center bg-gray-200">Edit {prevName}</h1>
                        {/* <span contentEditable="true"> */}
                    <div className="flex flex-col p-2">
                        <label className="text-left p-1 text-left" htmlFor="email">Name</label>

                            <input
                                className="border-black p-4 text-center bg-gray-100 w-full"
                                type="text"
                                placeholder={prevName}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                    </div>
                    <div className="flex flex-col p-2">
                        <label className="text-left p-1 text-left" htmlFor="email">Notes</label>
                        <input
                            contentEditable="true"
                            className="border-black p-4 h-auto text-center bg-gray-100 w-full"
                            type="text"
                            placeholder={prevNotes}
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

export default EditRosterForm;