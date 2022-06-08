import React, { createContext, useEffect, useState } from 'react'
import EditPopUp from '../editPopUp/EditPopUp';
import PopUpError from '../popUpError/PopUpError';
import TodoForm from '../todoForm/TodoForm';
import TodoItems from '../todoItems/TodoItems';
export const PopUpContext = createContext();
const TodoComps = () => {
    const [state, setState] = useState(() => {
        const checkStorage = () => {
            try {
                JSON.parse(window.localStorage.getItem("todos"))
            } catch (err) {
                return null
            }
            return JSON.parse(window.localStorage.getItem("todos"))
        }
        const todos = checkStorage();
        if (todos) {
            return { todos: todos, newTodo: "" }
        } else {
            return { todos: [], newTodo: "" }
        }
    });
    let [popUpIndex, setPopUpIndex] = useState(0);
    let [popUpIsEmpty, setPopUpIsEmpty] = useState(false);
    let [popUpValue, setPopUpValue] = useState("");
    let [popUp, setPopUp] = useState(false);
    let [popUpError,setPopUpError] = useState(false);
    const completeTodo = (e, i) => {
        const todos = state.todos.filter((todo) => {
            if (todo.id === i + 1) {
                if (todo.completed === true) {
                    todo.completed = false
                } else {
                    todo.completed = true
                }
            }
            return todo
        })
        setState({ ...state, todos })
    }
    const removeTodo = (i) => {
        setState(() => {
            const todos = state.todos;
            todos.splice(i, 1);
            todos.forEach((todo, i)=>{
                todo.id = i + 1
            })
            return {
                ...state,
                todos: todos
            }
        })
    }
    const editTodo = (i) => {
        const todo = state.todos.find(todo => {
            if (todo.id === i + 1) {
                return todo
            } else {
                return false
            }
        })
        console.log(state,i);
        setPopUpValue(todo.title)
        setPopUp(true);
    }
    const handleChange = (e) => {
        setState({
            ...state, newTodo: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(state.newTodo.length > 26){
            setPopUpError(true)
        } else {
            setState(() => {
                if (state.newTodo === "") {
                    return { ...state }
                } else {
                    const virtualState = {
                        todos: [...state.todos, {
                            id: state.todos.length + 1,
                            title: state.newTodo,
                            completed: false
                        }],
                        newTodo: ""
                    }
                    return virtualState
                }
            })
        }
    }
    useEffect(() => {
        window.localStorage.setItem("todos", JSON.stringify(state.todos));
        if(popUpError){
            const popUpErrorElement = document.querySelector(".popUpError");
            popUpErrorElement.classList.add("up");
            setTimeout(() => {
                setPopUpError(false)
            }, 1600);
        } 
    }, [state,popUpValue,popUpError])
    return (
        <div className="todoComps">
            <PopUpContext.Provider value={{ state: state, setState: setState, popUpIndex: popUpIndex, setPopUpIndex: setPopUpIndex, popUp: popUp, setPopUp: setPopUp, popUpValue: popUpValue, setPopUpValue: setPopUpValue, popUpIsEmpty: popUpIsEmpty, setPopUpIsEmpty: setPopUpIsEmpty,popUpError:popUpError,setPopUpError:setPopUpError }}>
                <TodoForm
                    newTodo={state.newTodo}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
                <TodoItems
                    todos={state.todos}
                    completeTodo={completeTodo}
                    editTodo={editTodo}
                    removeTodo={removeTodo}
                />
                {popUp ? <EditPopUp /> : ""}
                {popUpError ? <PopUpError /> : ""}
            </PopUpContext.Provider>
        </div>
    )
}


export default TodoComps