const LOAD_MEMBERS = "member/LOAD_MEMBERS"
const CREATE_MEMBER = "member/CREATE_MEMBER"
const EDIT_MEMBER = "member/EDIT_MEMBER"

const loading_everyone = (members) => ({
    type: LOAD_MEMBERS,
    members
})

const create_member = (member) => ({
    type: CREATE_MEMBER,
    member
})

const edit_a_member = (member) => ({
    type: EDIT_MEMBER,
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

    if (response.ok) {
        const member = await response.json();
        dispatch(create_member(member));
        debugger
        return member;
    }
}


export const editMember = (data) => async (dispatch) => {
    console.log(data)
    debugger
    const response = await fetch(`/api/members/edit/${data.memberId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
    });
    debugger

    console.log(response)

    if (response.ok) {
        const member = await response.json();
        dispatch(edit_a_member(member));
        debugger
        return member;
    }
    
    // dispatch(edit_a_member(data));
    // debugger
    // return data;

    // if (response.ok) {
        // const member = await response.json();
    // }
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
            return newState
        case EDIT_MEMBER:
            newState = Object.assign({}, state);
            newState.member = action.member
            debugger
            return newState
        default:
            return state
    }
}

export default memberReducer;