import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { getOneMember } from "../../store/member";

const EditMemberButton = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()
    const { memberId } = useParams()

    


    const editMember = async (e) => {
        //dispatch action that deletes Roster_Member
        //then dispatch getOneRoster
        //then dispatch getMembers
        //then set loaded to true
        history.push(`/members/edit/${memberId}`)
    };

    return <button className="bg-green-400 rounded p-1 mb-2 h-10" onClick={editMember}> Edit </button>;
};

export default EditMemberButton; 