import React, { useContext } from 'react';
import { PopUpContext } from '../todoComps/TodoComps';

const EditPopUp = (props) => {
    let { popUpIndex, state, setState, popUpValue, setPopUpValue, popUp, setPopUp, popUpIsEmpty, setPopUpIsEmpty,setPopUpError } = useContext(PopUpContext);
    const todo = state.todos.find(todo => {
        if (todo.id === popUpIndex + 1) {
            return todo
        } else {
            return false
        }
    })
    const handlePopUpchange = (e)=>{
        setPopUpValue(e.target.value)
    }
    const handleSave = ()=>{
        if (popUpValue === "") {
            popUpIsEmpty = true;
            setPopUpIsEmpty(popUpIsEmpty)
        } else {
            if(popUpValue.length > 26){
                setPopUpError(true)
            } else {
                setPopUp(() => {
                    const todos = state.todos.filter((todo) => {
                        if (todo.id === popUpIndex + 1) {
                            todo.title = popUpValue
                        }
                        return todo
                    });
                    setState({ ...state, todos });
                    popUp = false;
                    return popUp
                })
            }
        }
    }
    const handleCancel = ()=>{
        setPopUp(() => {
            popUp = false;
            return popUp
        })
    }
    const handlePopUpSubmit = (e)=>{
        e.preventDefault();
    }
    return (
        <div className="popUp">
            <form onSubmit={handlePopUpSubmit}>
                <input type="text" className="popUpIpt" onChange={handlePopUpchange} defaultValue={todo.title} />
                {popUpIsEmpty ? <span className="popUpIsEmpty">Please Fill task</span> : ""}
                <button type="submit" onClick={handleSave} className="popUpSave">Save</button>
                <button type="submit" onClick={handleCancel} className="popUpCancel">Cancel</button>
            </form>
        </div>
    )
}

export default EditPopUp