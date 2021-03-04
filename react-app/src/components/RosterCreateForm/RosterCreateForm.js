import React, { useEffect, useState } from 'react';
import * as rosterActions from "../../store/roster"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import "./MemberCreateForm.css"

const RosterCreateForm = () => {
    const [name, setName] = useState("")
    const [notes, setNotes] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()

    const { addNewRoster } = rosterActions


    const onSubmit = (e) => {
        e.preventDefault()
        const newRoster = {
            name,
            notes,
        }
        return dispatch(addNewRoster(newRoster)).then(() => history.push("/rosters"))
    }

    return (
        <div className="container p-3 m-auto bg-gray-200 rounded">
            <form className="self-center m-auto" method="POST" action="/rosters/create/new" onSubmit={onSubmit}>
                <h1>Roster Create Form</h1>
                <div>
                    <h1>Name</h1>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    >
                    </input>
                    <h1>Notes</h1>
                    <textarea
                        type="text"
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                    />
                </div>
                <button type="submit" disabled={name == "" ? true : false} className="bg-black text-white p-2 rounded hover:bg-white hover:text-black disabled:opacity-50">Submit</button>
            </form>
        </div>
    )
}

export default RosterCreateForm