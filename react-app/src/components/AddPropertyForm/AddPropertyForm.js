import React, { useEffect, useState } from 'react';
import * as memberActions from "../../store/member"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// import "./MemberCreateForm.css"

const AddPropertyForm = () => {
    const [value, setValue] = useState("")
    const [isChecked, setIsChecked] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()

    const {memberId} = useParams();

    const { addNewProperty } = memberActions;




    const onSubmit = (e) => {
        e.preventDefault()
        const newProperty = {
            value,
            isChecked,
            memberId,
        }
        console.log(newProperty)
        debugger
        return dispatch(addNewProperty(newProperty))
        // .then(() => history.push("/members"))
    }

    return (
        <div className="rounded block p-3 text-center bg-gray-600 w-9/12 m-auto">
            <div className="container p-3 m-auto bg-gray-200 rounded">
                <form className="self-center m-auto pb-3" method="POST" action="/members/create/new" onSubmit={onSubmit}>
                    <h1 className="bg-black text-white p-3 font-bold">Add Property</h1>
                    <div>
                        <div className="flex flex-col p-2">
                            <h1 className="text-left p-1 font-bold">Property: </h1>
                    
                            <input
                                className="shadow-inner rounded border border-gray-400 focus:bg-blue-200"
                                type="text"
                                onChange={(e) => setValue(e.target.value)}
                                value={value}
                            >
                            </input>
                        </div>

                        <div className="flex flex-row p-2">
                            <h1 className="p-1 text-left font-bold">True or False?</h1>
                                
                                <input 
                                    type="radio" 
                                    value={true}
                                    name="isChecked"  
                                    onChange={(e) => setIsChecked(e.target.value)}
                                    // value={notes}
                                /> True
                                <input 
                                    type="radio" 
                                    value={false}
                                    name="isChecked"  
                                    onChange={(e) => setIsChecked(e.target.value)}
                                    // value={notes}
                                /> False
                                {/* <input type="radio" value="Female" name="gender" /> Female */}
                        </div>
                    </div>
                    <button type="submit" disabled={value === "" || isChecked === "" ? true : false} className="bg-blue-400 text-white p-2 rounded disabled:bg-red-200">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddPropertyForm