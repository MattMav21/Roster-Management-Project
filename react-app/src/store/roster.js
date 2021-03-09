const LOAD_ROSTERS = "roster/LOAD_ROSTERS"
const CREATE_ROSTER = "roster/LOAD_ROSTERS"
const ASSIGN_TO_ROSTER = "roster/ASSIGN_TO_ROSTER"
const EDIT_ROSTER = "roster/EDIT_ROSTER"
const UNASSIGN_TO_ROSTER = "roster/UNASSIGN_TO_ROSTER"

const load_rosters = (rosters) => ({
    type: LOAD_ROSTERS,
    rosters
})

const create_roster = (roster) => ({
    type: CREATE_ROSTER,
    roster
})

const assign_roster = (data) => ({
    type: ASSIGN_TO_ROSTER,
    data
})

const edit_a_roster = (roster) => ({
    type: EDIT_ROSTER,
    roster
})

const unassign_roster = (data) => ({
    type: UNASSIGN_TO_ROSTER,
    data
})

export const getRosters = () => async (dispatch) => {
    const response = await fetch(`/api/rosters/`);
    debugger
    const res = await response.json();
    dispatch(load_rosters(res));
    return res;
}

export const getOneRoster = (id) => async (dispatch) => {
    const response = await fetch(`/api/rosters/${id}`);
    const res = await response.json();
    dispatch(load_rosters(res));
    return res;
}

export const addNewRoster = data => async (dispatch) => {
    console.log(data)
    debugger
    const response = await fetch(`/api/rosters/create`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
    });
    debugger

    console.log(response)

    if (response.ok) {
        const roster = await response.json();
        dispatch(create_roster(roster));
        debugger
        return roster;
    }
}

export const assignToRoster = data => async (dispatch) => {
    console.log(data)
    debugger
    const response = await fetch(`/api/rosters/assign`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
    });
    debugger

    console.log(response)

    if (response.ok) {
        const roster = await response.json();
        dispatch(assign_roster(roster));
        debugger
        return roster;
    }
}


export const editRoster = (data) => async (dispatch) => {
    console.log(data)
    debugger
    const response = await fetch(`/api/rosters/edit/${data.rosterId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
    });
    debugger

    console.log(response)

    if (response.ok) {
        const roster = await response.json();
        dispatch(edit_a_roster(roster));
        debugger
        return roster;
    }

}

export const unassignToRoster = (data) => async (dispatch) => {
    console.log(data)
    debugger
    const response = await fetch(`/api/rosters/${data.rosterId}/delete/${data.memberId}`, {
        method: 'DELETE',
    });

    debugger

    console.log(response)

    if (response.ok) {
        const roster = await response.json();
        dispatch(unassign_roster(roster));
    }
}



const rosterReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ROSTERS:
            newState = Object.assign({}, state);
            newState.roster = action.rosters
            debugger
            //add stuff here later
            return newState
        case CREATE_ROSTER:
            newState = Object.assign({}, state);
            newState.roster = action.rosters
            debugger
            return newState
        case ASSIGN_TO_ROSTER:
            newState = Object.assign({}, state);
            newState.roster = action.rosters
            debugger
            return newState
        case EDIT_ROSTER:
            newState = Object.assign({}, state);
            newState.roster = action.roster
            debugger
            return newState
        case UNASSIGN_TO_ROSTER:
            newState = Object.assign({}, state);
            newState.roster = action.roster;
            debugger
            return newState;
        default:
            return state
    }
}

export default rosterReducer;