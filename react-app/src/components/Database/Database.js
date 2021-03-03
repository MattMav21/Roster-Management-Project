import React, { useEffect, useState } from 'react';
import * as memberActions from "../../store/member"
import { useDispatch, useSelector } from 'react-redux';

const Database = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const { getMembers } = memberActions;
    const everybody = useSelector((state) => state.member.member);
    if (everybody !== undefined) {
        console.log(Object.values(everybody).map((member) => member.name))
    }

    useEffect(() => {
        dispatch(getMembers(everybody)).then(() => setLoaded(true))
    }, [getMembers])

    return (
        <div>
            {loaded && Object.values(everybody).map((member) => {
                return (
                    <h1>{member.name}</h1>
                )
            })}
       </div>
    );

};

export default Database;