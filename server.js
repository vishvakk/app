const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pool = require('./db');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: './env'})
const app = express();




//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

if (process.env.NODE_ENV === "production"){
// server static react
    app.use(express.static(path.join(__dirname, "client/build")))
};

const PORT = process.env.PORT || 3000;


app.post("/todos", async (req, res)=> {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO public.todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/todos", async (req, res)=> {
    try {
        const todos = await pool.query("select * from public.todo")
        res.json(todos.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/todos/:id", async (req, res)=> {
    try {
        const { id } = req.params
        const todo = await pool.query("select * from public.todo where id = $1",[id])
        res.json(todo.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.put("/todos/:id", async (req, res)=> {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const upTodo = await pool.query("Update public.todo set description = $1 where id =$2", [description,id])
        res.json("Updated")
    } catch (err) {
        console.error(err.message)
    }
})

app.delete("/todos/:id", async (req, res)=> {
    try {
        const { id } = req.params
        const delTodo = await pool.query("delete from public.todo where id = $1",[id])
        res.json("deleted")
    } catch (err) {
        console.error(err.message)
    }
})

//Main Function
app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`)
})