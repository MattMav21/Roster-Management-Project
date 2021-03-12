const LOAD_ROSTERS = "roster/LOAD_ROSTERS"
const CREATE_ROSTER = "roster/LOAD_ROSTERS"
const ASSIGN_TO_ROSTER = "roster/ASSIGN_TO_ROSTER"
const EDIT_ROSTER = "roster/EDIT_ROSTER"
const UNASSIGN_TO_ROSTER = "roster/UNASSIGN_TO_ROSTER"
const DELETE_ROSTER = "roster/DELETE_ROSTER"
const SEARCH = "roster/SEARCH"

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

const delete_roster = (roster) => ({
    type: DELETE_ROSTER,
    roster
})

const searching = (query) => ({
    type: SEARCH,
    query
})

export const getRosters = () => async (dispatch) => {
    const response = await fetch(`/api/rosters/`);
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
    const response = await fetch(`/api/rosters/create`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const roster = await response.json();
        dispatch(create_roster(roster));
        return roster;
    }
}

export const assignToRoster = data => async (dispatch) => {
    const response = await fetch(`/api/rosters/assign`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const roster = await response.json();
        dispatch(assign_roster(roster));
        return roster;
    }
}


export const editRoster = (data) => async (dispatch) => {
    const response = await fetch(`/api/rosters/edit/${data.rosterId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const roster = await response.json();
        dispatch(edit_a_roster(roster));
        return roster;
    }

}

export const unassignToRoster = (data) => async (dispatch) => {
    const response = await fetch(`/api/rosters/${data.rosterId}/delete/${data.memberId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const roster = await response.json();
        dispatch(unassign_roster(roster));
    }
}

export const destroyRoster = (id) => async (dispatch) => {
    const response = await fetch(`/api/rosters/delete/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const roster = await response.json();
        dispatch(delete_roster(roster));
    }
}

export const searchEverything = (query) => async (dispatch) => {
    const response = await fetch(`/api/rosters/search/${query}`)
    const res = await response.json();
    dispatch(searching(res));
    return res;
}



const rosterReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ROSTERS:
            newState = Object.assign({}, state);
            newState.roster = action.rosters
            return newState
        case CREATE_ROSTER:
            newState = Object.assign({}, state);
            newState.roster = action.rosters
            return newState
        case ASSIGN_TO_ROSTER:
            newState = Object.assign({}, state);
            newState.roster = action.rosters
            return newState
        case EDIT_ROSTER:
            newState = Object.assign({}, state);
            newState.roster = action.roster
            return newState
        case UNASSIGN_TO_ROSTER:
            newState = Object.assign({}, state);
            newState.roster = action.roster;
            return newState;
        case DELETE_ROSTER:
            newState = Object.assign({}, state);
            newState.roster = action.roster;
            return newState;
        case LOAD_ROSTERS:
            newState = Object.assign({}, state);
            newState.roster = action.query
            return newState
        default:
            return state
    }
}

export default rosterReducer;