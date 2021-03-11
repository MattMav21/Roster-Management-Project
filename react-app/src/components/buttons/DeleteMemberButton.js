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

    const deleteMember = async (e) => {
        if (window.confirm(`Are you sure you want to delete ${memberName}?`)) {

            await dispatch(destroyMember(memberId)).then(() =>
                dispatch(getMembers())
                    .then(() => setLoaded(true)))
                .then(() => history.push(`/members`))


            //dispatch action that deletes Roster_Member
            //then dispatch getOneRoster
            //then dispatch getMembers
            //then set loaded to true
        } else {
            return
        }

    };

    return <button className="relative right-4 bg-red-400 rounded p-1" onClick={deleteMember}> X </button>;
};

export default DeleteMemberButton;