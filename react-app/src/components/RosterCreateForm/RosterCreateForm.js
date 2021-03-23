import React, { useEffect, useState } from 'react';
import * as rosterActions from "../../store/roster"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./RosterCreateForm.css"

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
        <div className="rounded block p-3 text-center m-auto bg-gray-600 w-9/12">
            <div className="container p-3 m-auto bg-gray-200 rounded">
                <form className="self-center m-auto pb-3" method="POST" action="/rosters/create/new" onSubmit={onSubmit}>
                    <h1 className="bg-black text-white p-3 font-bold">Create a Roster</h1>
                    <div>
                        <div className="flex flex-col p-2">
                            <h1 className="text-left p-1 font-bold">Name:</h1>
                            <input
                                className="shadow-inner rounded border border-gray-400 focus:bg-blue-200"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            >
                            </input>

                        </div>
                        <div className="flex flex-col p-2">
                        <h1 className="p-1 text-left font-bold">Notes:</h1>
                        <textarea
                            className="h-40 shadow-inner rounded border border-gray-400 focus:bg-blue-200"
                            type="text"
                            onChange={(e) => setNotes(e.target.value)}
                            value={notes}
                        />
                        </div>
                    </div>
                    <button type="submit" disabled={name === "" ? true : false} className="bg-blue-400 text-white p-2 rounded disabled:bg-red-200">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default RosterCreateForm