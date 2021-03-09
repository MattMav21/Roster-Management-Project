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
    // console.log(this_member)

    const { this_member, roster_name } = props;
    console.log(this_member, roster_name)

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

            //dispatch action that deletes Roster_Member
            //then dispatch getOneRoster
            //then dispatch getMembers
            //then set loaded to true
            console.log("Yes")
        } else {
            console.log("No")
        }


    };

    return <button className="bg-red-700 rounded p-1" onClick={unassign}> X </button>;
};

export default UnassignButton;
