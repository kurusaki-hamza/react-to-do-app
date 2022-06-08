import React from 'react'

const TodoForm = (props) => {
    return (
        <div className="todoForm">
            <form onSubmit={props.handleSubmit}>
                <input type="text" placeholder="Type New Task..." onChange={props.handleChange} value={props.newTodo} />
                <input type="submit" value="Save" />
            </form>
        </div>
    )
}

export default TodoForm