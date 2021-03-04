import React, { useEffect, useState } from 'react';
import * as memberActions from "../../store/member"
import * as rosterActions from "../../store/roster"
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import "./RosterAssignmentForm.css"

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

    const { getMembers } = memberActions;
    const { getRosters } = rosterActions;

    const members = useSelector((state) => state.member.member)
    const rosters = useSelector((state) => state.roster.roster)



    console.log("MEMBERS", members)
    console.log("ROSTERS", rosters)

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
            member,
            roster,
        }
        console.log(assignment)
    }

    
    
    console.log("MEMBER OPTIONS", memberOptions)
    console.log("ROSTER OPTIONS", rosterOptions)
    console.log("MEMBER IDS", memberIds)
    console.log("ROSTER IDS", rosterIds)

    const memberCorr = {}
    const rosterCorr = {}
    memberOptions.forEach((option, i) => memberCorr[option] = memberIds[i])
    rosterOptions.forEach((option, i) => rosterCorr[option] = rosterIds[i])

    console.log("MEMBER OBJECT", memberCorr)
    console.log("ROSTER OBJECT", rosterCorr)

    return (
        <div className="container p-3 m-auto bg-gray-200 rounded">
        { memberOptions && rosterOptions && loaded &&
            <form className="self-center m-auto" 
                method="POST" 
                action="/members/assign/new" 
                onSubmit={onSubmit}
            >
                <h1>Member Create Form</h1>
                <div>
                    <h1>Member</h1>
                    <select
                        // onChange={(e) => setName(e.target.value)}
                        // value={name}
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
                        {/* {memberOptions.map((member) => {
                            {console.log(member)}
                            return (
                                <option
                                    value={member}
                                    onChange={(e) => setMember(e.target.value)}
                                >
                                {member}
                                </option>
                            )
                        })} */}
                    </select>

                    
                    <h1>Roster</h1>
                    <select
                        // onChange={(e) => setName(e.target.value)}
                        // value={name}
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
                        {/* {rosterOptions.map((roster) => {
                            { console.log(roster) }
                            return (
                                <option
                                    value={roster}
                                    onChange={(e) => setRoster(e.target.value)}
                                >
                                    {roster}
                                </option>
                            )
                        })} */}
                    </select>
                </div>
                <button 
                    type="submit" 
                    disabled={member == memberOptions[0] || roster == rosterOptions[0] ? true : false} 
                    className="bg-black text-white p-2 rounded hover:bg-white hover:text-black disabled:opacity-50"
                >
                    Submit
                </button>
            </form>
        }
        </div>
    )
}

export default RosterAssignmentForm;