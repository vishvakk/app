import React, { Fragment } from 'react';
import './App.css';
import CreateTodo from './components/CreateTodo';
import ListTodo from './components/ListTodo';


function App() {
  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center mt-5">Todo App</h1>
        <CreateTodo />
        <ListTodo />
      </div>
    </Fragment>
  );
}

export default App;
