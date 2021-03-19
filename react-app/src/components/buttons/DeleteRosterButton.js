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
        
        } else {
            return
        }

    };

    return <button className="relative right-4 text-red-600 rounded px-2 hover:bg-red-900 hover:text-white" onClick={deleteRoster}> X </button>;
};

export default DeleteRosterButton;