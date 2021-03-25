import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

const Checkbox = ({memberId, propObj}) => {
    let defaultCheck = propObj.map((obj) => obj.is_checked)[0]
    let propertyId = propObj.map((obj) => obj.id)[0]
    let name = propObj.map((obj) => obj.name)[0]

    const [currentCheck, setCurrentCheck] = useState(defaultCheck);
    console.log("START CHECK:", currentCheck)
    // console.log(memberId, propObj)
    // console.log(currentCheck)
    // console.log(propObj.map((obj) => obj.is_checked))

    const changeValue = async () => {
        setCurrentCheck(!currentCheck);

        console.log("onChange check", currentCheck)

        let theBigChange = {
            memberId: Number(memberId),
            propId: propertyId,
            name: name,
            is_checked: !currentCheck
        }

        console.log(theBigChange)

        return theBigChange;
    }

    // console.log(name, currentCheck)

    return (
    <input
        className="relative mr-4"
        type="checkbox"
        checked={currentCheck}
        onChange={changeValue}
    />)
};

export default Checkbox;