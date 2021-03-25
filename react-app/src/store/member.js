const LOAD_MEMBERS = "member/LOAD_MEMBERS"
const CREATE_MEMBER = "member/CREATE_MEMBER"
const EDIT_MEMBER = "member/EDIT_MEMBER"
const DELETE_MEMBER = "member/DELETE_MEMBER"
const ADD_PROPERTY = "member/ADD_PROPERTY"
const CHANGE_PROPERTY = "member/CHANGE_PROPERTY"


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

const delete_member = (member) => ({
    type: DELETE_MEMBER,
    member
})

const add_property = (property) => ({
    type: ADD_PROPERTY,
    property
})

const change_property = (data) => ({
    type: CHANGE_PROPERTY,
    data
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
    const response = await fetch(`/api/members/create`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const member = await response.json();
        dispatch(create_member(member));
        return member;
    }
}


export const editMember = (data) => async (dispatch) => {
    const response = await fetch(`/api/members/edit/${data.memberId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
    });


    if (response.ok) {
        const member = await response.json();
        dispatch(edit_a_member(member));
        return member;
    }
}

export const destroyMember = (id) => async (dispatch) => {
    const response = await fetch(`/api/members/delete/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const member = await response.json();
        dispatch(delete_member(member));
    }
}

export const getUnassignedMembers = () => async (dispatch) => {
    const response = await fetch('/api/members/unassigned');
    const res = await response.json();
    dispatch(loading_everyone(res));
    return res;
}

export const addNewProperty = (data) => async (dispatch) => {
    const response = await fetch(`/api/members/addProp/${data.memberId}`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const property = await response.json();
        dispatch(add_property(property));
        return property;
    }
}

export const changeProperty = (data) => async (dispatch) => {
    const response = await fetch(`/api/members/changecheck/${data.memberId}/${data.propId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data)
    });
    debugger
    const res = await response.json();
    dispatch(change_property(res));
    return res;
}


const memberReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_MEMBERS:
            newState = Object.assign({}, state);
            newState.member = action.members
            return newState
        case CREATE_MEMBER:
            newState = Object.assign({}, state);
            newState.member = action.members
            return newState
        case EDIT_MEMBER:
            newState = Object.assign({}, state);
            newState.member = action.member
            return newState
        case DELETE_MEMBER:
            newState = Object.assign({}, state);
            newState.roster = action.roster;
            return newState;
        case ADD_PROPERTY:
            newState = Object.assign({}, state);
            debugger
            newState.property = action.property;
            debugger
            return newState;
        case CHANGE_PROPERTY:
            newState = Object.assign({}, state);
            debugger
            newState.data = action.data;
            debugger
            return newState;
        default:
            return state
    }
}

export default memberReducer;