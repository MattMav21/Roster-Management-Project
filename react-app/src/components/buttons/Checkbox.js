import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

const Checkbox = ({memberId, propObj}) => {
    let defaultCheck = propObj.map((obj) => obj.is_checked)[0]
    const [currentCheck, setCurrentCheck] = useState(defaultCheck);
    // console.log(memberId, propObj)
    // console.log(currentCheck)
    // console.log(propObj.map((obj) => obj.is_checked))
    console.log(currentCheck);

    const changeValue = () => {
        setCurrentCheck(!currentCheck)
        console.log(currentCheck)
    }

    return (
    <input
        className="relative top-7 left-8"
        type="checkbox"
        checked={currentCheck}
        onChange={changeValue}
    />)
};

export default Checkbox;