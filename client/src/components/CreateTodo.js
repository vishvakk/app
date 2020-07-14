import React,{ Fragment, useState } from 'react';

const CreateTodo = () => {
    const [description, setDescription] = useState('')

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description: String } 
            const response = await fetch("http://localhost:5000/todos/", {
            method: "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
            })
            window.location = "/";
            
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <Fragment>
            <form  className='d-flex mt-5' onSubmit={onSubmitForm}>
                <input placeholder="Add Todo" className="form-control" type="text" value={description} onChange={(e)=> setDescription(e.target.value) }/>
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )   
}

export default CreateTodo;