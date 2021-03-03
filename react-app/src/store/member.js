const LOAD_MEMBERS = "member/LOAD_MEMBERS"

const loading_everyone = (members) => ({
    type: LOAD_MEMBERS,
    members
})

export const getMembers = () => async (dispatch) => {
    const response = await fetch(`/api/members/`);
    debugger
    const res = await response.json();
    debugger
    dispatch(loading_everyone(res));
    return res;
}

const INITIAL_STATE = { member: null };

const memberReducer = (state = INITIAL_STATE, action) => {
    let newState;
    switch (action.type) {
        case LOAD_MEMBERS:
        newState = Object.assign({}, state);
        debugger
        newState.member = action.member
        //add stuff here later
        default:
            return state
    }
}

export default memberReducer;