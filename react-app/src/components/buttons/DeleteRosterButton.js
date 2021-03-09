import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import * as rosterActions from "../../store/roster"

const DeleteRosterButton = (props) => {
    const [loaded, setLoaded] = useState(false);
    const { destroyRoster, getRosters } = rosterActions;
    const dispatch = useDispatch()
    const history = useHistory()

    const { rosterId, rosterName } = props;
    console.log(rosterId, rosterName)
        
    const deleteRoster = async (e) => {
        

        //dispatch action that deletes Roster
        //then dispatch getOneRoster
        //then dispatch getMembers
        //then set loaded to true
        // history.push(`/rosters`)

        if (window.confirm(`Are you sure you want to delete ${rosterName}?`)) {

            await dispatch(destroyRoster(rosterId)).then(() =>
                        dispatch(getRosters())
                        .then(() => setLoaded(true)))
                        .then(() => history.push(`/rosters`))
        

            //dispatch action that deletes Roster_Member
            //then dispatch getOneRoster
            //then dispatch getMembers
            //then set loaded to true
            console.log("Yes")
        } else {
            console.log("No")
        }

    };

    return <button className="relative right-4 bg-red-400 rounded p-1" onClick={deleteRoster}> X </button>;
};

export default DeleteRosterButton;