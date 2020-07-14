import React,{ Fragment, useState } from 'react';

const CreateTodo = () => {
    const [description, setDescription] = useState("")

    const [errors, setErrors] = useState({})

    const handleValidation = () => {
        let fields = description;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!description){
           formIsValid = false;
           errors["description"] = "Cannot be empty";
        }
        setErrors({errors});
        return formIsValid;
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            if(handleValidation()){
                const body = { description } 
                const response = await fetch("/todos", {
                method: "POST",
                headers : {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(body)
                })
                window.location = "/";
             }else{
                alert("Description cannot be empty")
             };
            
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <Fragment>
            <form  className='d-flex mt-5' onSubmit={onSubmitForm}>
                <input placeholder="Add Todo" className="form-control" type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )   
}

export default CreateTodo;