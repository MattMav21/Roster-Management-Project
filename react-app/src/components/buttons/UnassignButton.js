import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as rosterActions from "../../store/roster"
import * as memberActions from "../../store/member"


const UnassignButton = (props) => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const { rosterId, memberId } = useParams()
    const { unassignToRoster, getOneRoster } = rosterActions;
    const { getMembers } = memberActions;
    const history = useHistory()

    const { this_member, roster_name } = props;

    const unassign = async (e) => {
        const theMemberId = this_member.map((person) => {
            return person.id
        })

        const theMemberName = this_member.map((person) => {
            return person.name
        })

        const data = {
            rosterId: rosterId,
            memberId: theMemberId[0]
        };

        if (window.confirm(`Are you sure you want to delete ${theMemberName} from ${roster_name}?`)) {
            
            await dispatch(unassignToRoster(data)).then(() => 
            dispatch(getOneRoster(rosterId))
                .then(() => dispatch(getMembers())
                .then(() => setLoaded(true))
                .then(() => history.push(`/rosters/${rosterId}`))
            ));
        } else {
            return
        }


    };

    return <button className="relative right-4 text-red-600 rounded px-2 hover:bg-red-900 hover:text-white" onClick={unassign}> X </button>;
};

export default UnassignButton;
