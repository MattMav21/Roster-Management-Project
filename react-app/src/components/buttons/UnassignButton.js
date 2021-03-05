import React, { useState } from "react";
import { useDispatch } from 'react-redux';

const UnassignButton = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()

    const unassign = async (e) => {
        //dispatch action that deletes Roster_Member
        //then dispatch getOneRoster
        //then dispatch getMembers
        //then set loaded to true
        console.log("Button Clicked")
    };

    return <button className="bg-red-700 rounded p-2" onClick={unassign}> X </button>;
};

export default UnassignButton;
