import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import * as memberActions from "../../store/member"

const DeleteMemberButton = (props) => {
    const [loaded, setLoaded] = useState(false);
    const { destroyMember, getMembers } = memberActions;
    const dispatch = useDispatch()
    const history = useHistory()

    const { memberId, memberName } = props;
    // console.log(rosterId, rosterName)

    const deleteMember = async (e) => {


        //dispatch action that deletes Roster
        //then dispatch getOneRoster
        //then dispatch getMembers
        //then set loaded to true
        // history.push(`/rosters`)

        if (window.confirm(`Are you sure you want to delete ${memberName}?`)) {

            await dispatch(destroyMember(memberId)).then(() =>
                dispatch(getMembers())
                    .then(() => setLoaded(true)))
                .then(() => history.push(`/members`))


            //dispatch action that deletes Roster_Member
            //then dispatch getOneRoster
            //then dispatch getMembers
            //then set loaded to true
            console.log("Yes")
        } else {
            console.log("No")
        }

    };

    return <button className="relative right-4 bg-red-400 rounded p-1" onClick={deleteMember}> X </button>;
};

export default DeleteMemberButton;