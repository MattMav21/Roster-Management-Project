const LOAD_MEMBERS = "member/LOAD_MEMBERS"

const loading_everyone = (members) => ({
    type: LOAD_MEMBERS,
    members
})

export const getMembers = () => async (dispatch) => {
    const response = await fetch('/api/members/');
    const res = await response.json();
    dispatch(loading_everyone(res));
    return res;
}

export const getOneMember = (id) => async (dispatch) => {
    const response = await fetch(`/api/members/${id}`);
    const res = await response.json();
    dispatch(loading_everyone(res));
    return res;
}

const memberReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_MEMBERS:
        newState = Object.assign({}, state);
        newState.member = action.members
        //add stuff here later
        return newState

        default:
            return state
    }
}

export default memberReducer;