import React, { useEffect, useState } from 'react';
import * as memberActions from "../../store/member"
import * as rosterActions from "../../store/roster"
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import "./RosterAssignmentForm.css"
import { useHistory } from 'react-router-dom';

const RosterAssignmentForm = () => {
    let memberOptions = ["SELECT A MEMBER"];
    let rosterOptions = ["SELECT A ROSTER"];

    let memberIds = [0]
    let rosterIds = [0]

    const [loaded, setLoaded] = useState(false);
    const [member, setMember] = useState(memberOptions[0])
    const [roster, setRoster] = useState(rosterOptions[0])
    // const [memberId, setMemberId] = useState(null)
    // const [rosterId, setRosterId] = useState(null)

    const dispatch = useDispatch();
    const history = useHistory();

    const { getMembers } = memberActions;
    const { getRosters, assignToRoster } = rosterActions;

    const members = useSelector((state) => state.member.member)
    const rosters = useSelector((state) => state.roster.roster)

    useEffect(() => {
        dispatch(getRosters()).then(() =>
        dispatch(getMembers()))
        .then(() => setLoaded(true))
    }, [getRosters, getMembers])

    if (members !== undefined) {
        Object.values(members).map((member) => memberOptions.push(member.name))
        Object.values(members).map((member) => memberIds.push(member.id))
    }

    if (rosters !== undefined) {
        Object.values(rosters).map((roster) => rosterOptions.push(roster.name))
        Object.values(rosters).map((roster) => rosterIds.push(roster.id))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const assignment = {
            member_id: member,
            roster_id: roster,
        }
        dispatch(assignToRoster(assignment))
        .then(() => history.push(`/rosters/${roster}`))
    }

    const memberCorr = {}
    const rosterCorr = {}
    memberOptions.forEach((option, i) => memberCorr[option] = memberIds[i])
    rosterOptions.forEach((option, i) => rosterCorr[option] = rosterIds[i])

    return (
        <div className="block p-3 text-center bg-gray-600">
        <div className="container p-3 m-auto bg-gray-200 rounded">
        { memberOptions && rosterOptions && loaded &&
            <form className="self-center m-auto" 
                method="POST" 
                action="/members/assign/new" 
                onSubmit={onSubmit}
            >
                    <h1 className="bg-black text-white p-3">Assign a Member to a Roster</h1>
                <div>
                    <div className="flex flex-col p-2">
                        <h1 className="text-left p-1 text-center">Member</h1>
                        <select
                            className="w-6/12 self-center"
                            value={member}
                            onChange={(e) => setMember(e.target.value)}
                        >
                        {Object.keys(memberCorr).map((key) => {
                            return (
                                <option
                                    value={memberCorr[key]}
                                    onChange={(e) => setMember(e.target.value)}
                                >
                                    {key}
                                </option>
                            )
                        })}
                        </select>
                    </div>

                    <div>
                    <h1>Roster</h1>
                    <select
                        className="w-6/12 self-center"
                        value={roster}
                        onChange={(e) => setRoster(e.target.value)}
                    >
                        {Object.keys(rosterCorr).map((key) => {
                            return (
                                <option
                                    value={rosterCorr[key]}
                                    onChange={(e) => setRoster(e.target.value)}
                                >
                                    {key}
                                </option>
                            )
                        })}
                    </select>
                    </div>
                </div>
                <button 
                    type="submit" 
                    disabled={member == memberOptions[0] || roster == rosterOptions[0] ? true : false} 
                    className="bg-black text-white p-2 m-4 rounded hover:bg-white hover:text-black disabled:opacity-50"
                >
                    Submit
                </button>
            </form>
        }
        </div>
    </div>

    )
}

export default RosterAssignmentForm;