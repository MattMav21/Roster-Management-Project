import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

const EditRosterButton = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()
    const { rosterId } = useParams()

    const editMember = async (e) => {
        
        //dispatch action that deletes Roster_Member
        //then dispatch getOneRoster
        //then dispatch getMembers
        //then set loaded to true
        history.push(`/rosters/edit/${rosterId}`)
    };

    return <button className="bg-green-400 rounded p-1" onClick={editMember}> Edit This Roster </button>;
};

export default EditRosterButton;