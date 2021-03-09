import React, { useState } from "react";
import { useDispatch } from 'react-redux';

const EditRosterButton = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()

    const editRoster = async (e) => {
        //dispatch action that deletes Roster_Member
        //then dispatch getOneRoster
        //then dispatch getMembers
        //then set loaded to true
        console.log("Button Clicked")
    };

    return <button className="bg-green-400 rounded p-1" onClick={editRoster}> Edit </button>;
};

export default EditRosterButton; 