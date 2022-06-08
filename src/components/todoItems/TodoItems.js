import React, { useContext } from 'react'
import { PopUpContext } from '../todoComps/TodoComps';

const TodoItems = (props) => {
    let { popUpIndex, setPopUpIndex } = useContext(PopUpContext);
    const todos = props.todos.map((todo, i) => {
        return (
            <div key={i+1} className="todoItem">
                <div className="checkbox" >
                    <input type="checkbox" checked={todo.completed} className="hiddenCheckbox" onChange={e => props.completeTodo(e, i)} />
                    <div className="styledCheckBox"></div>
                </div>
                <div className="todoItemContent" style={{ textDecorationColor: 'black',
                textDecorationStyle:'double',
                textDecorationLine: todo.completed ? "line-through" : "none"
                }}>
                    {todo.title}
                </div>
                <div className="todoItemIcons">
                    <i className="fa fa-pencil" onClick={() => { props.editTodo(i); popUpIndex = i; setPopUpIndex(popUpIndex) }}></i>
                    <i className="fa fa-trash-can" onClick={() => props.removeTodo(i)}></i>
                </div>
            </div>
        )
    });
    return (
        <div className="todoItems">
            {todos.length > 0 ? todos : <div className="noTasks">There's no Tasks</div>}
        </div>
    )
}

export default TodoItems