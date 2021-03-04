const LOAD_ROSTERS = "roster/LOAD_ROSTERS"
const CREATE_ROSTER = "roster/LOAD_ROSTERS"

const load_rosters = (rosters) => ({
    type: LOAD_ROSTERS,
    rosters
})

const create_roster = (roster) => ({
    type: CREATE_ROSTER,
    roster
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
        default:
            return state
    }
}

export default rosterReducer;