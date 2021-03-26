import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

const AddProperties = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()
    const { memberId } = useParams()

    const addProp = async (e) => {

        //dispatch action that deletes Roster_Member
        //then dispatch getOneRoster
        //then dispatch getMembers
        //then set loaded to true
        history.push(`/members/addProp/${memberId}`)
    };

    return <button className="hover:bg-green-600 hover:text-white hover:shadow-2xl bg-green-500 text-black rounded px-4 py-1 mb-2 w-32 m-auto" onClick={addProp}
    > 
    Add Property 
    </button>;
};

export default AddProperties;