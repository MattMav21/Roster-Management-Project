const LOAD_MEMBERS = "member/LOAD_MEMBERS"
const CREATE_MEMBER = "member/CREATE_MEMBER"

const loading_everyone = (members) => ({
    type: LOAD_MEMBERS,
    members
})

const create_member = (member) => ({
    type: CREATE_MEMBER,
    member
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

export const addNewMember = data => async (dispatch) => {
    console.log(data)
    // const { name, notes } = data;
    // console.log(name, notes)
    // const formData = new FormData();
    // formData.append("name", name)
    // formData.append("notes", notes)
    debugger
    const response = await fetch(`/api/members/create`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
    });
    debugger

    console.log(response)

    // console.log(formData)

    if (response.ok) {
        const member = await response.json();
        dispatch(create_member(member));
        debugger
        return member;
    }
}

const memberReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_MEMBERS:
            newState = Object.assign({}, state);
            newState.member = action.members
            //add stuff here later
            return newState
        case CREATE_MEMBER:
            newState = Object.assign({}, state);
            newState.member = action.members
            debugger
            return newState
        default:
            return state
    }
}

export default memberReducer;