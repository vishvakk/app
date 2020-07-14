import React, { Fragment, useState, useEffect } from 'react';
import EditTodo from './EditTodo';

const ListTodo = () => {
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
       try {
            const response = await fetch("http://localhost:5000/todos/");
            const jsonData = await response.json();
            setTodos(jsonData)
            console.log(jsonData)
       } catch (err) {
           console.error(err.message)
       }
    }


    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method:"DELETE",
            })
            setTodos(todos.filter(todo => todo.id !== id))
        } catch (err) {
            console.error(err.message)
        }

    };


    useEffect(() => {
        getTodos()
    },[]);

    return (
        <Fragment>
             <table class="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                { todos.map((todo) => (
                    <tr key={todo.id}> 
                        <td>
                            {todo.description}
                        </td>
                        <td> <EditTodo todo={todo}/></td>
                        <td><button className="btn btn-danger" onClick={ () => {
                            deleteTodo(todo.id)
                        }}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
             </table>
        </Fragment>
    )
}

export default ListTodo;