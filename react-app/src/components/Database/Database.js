import React, { useEffect, useState } from 'react';
import * as memberActions from "../../store/member"
import { useDispatch, useSelector } from 'react-redux';

const Database = () => {
    const dispatch = useDispatch();
    const { getMembers } = memberActions;
    const everybody = useSelector((state) => state.member);


    useEffect(() => {
        dispatch(getMembers(everybody))
    })

    return (
       <h1>Database</h1>
    );

};

export default Database;