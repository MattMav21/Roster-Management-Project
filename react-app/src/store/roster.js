const LOAD_ROSTERS = "roster/LOAD_ROSTERS"

const load_rosters = (rosters) => ({
    type: LOAD_ROSTERS,
    rosters
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


const rosterReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ROSTERS:
            newState = Object.assign({}, state);
            newState.roster = action.rosters
            //add stuff here later
            return newState

        default:
            return state
    }
}

export default rosterReducer;