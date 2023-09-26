import React, {useState} from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState({desc: '', date: ''});
  const [todos, setTodos] = useState([]);

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  }

  return (
    <div className="App">
      <form onSubmit={addTodo}>
        Description:<input type="text" name="desc" value={todo.desc} onChange={inputChanged}/>
        Date:<input type="text" name="date" value={todo.date} onChange={inputChanged}/>
        <input type="submit" value="Add"/>
      </form>
      <table>
        <thead class="bold">
          <tr>
            <td>Description</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {
          todos.map((todo, index) =>
            <tr key={index}>
              <td>{todo.desc}</td>
              <td>{todo.date}</td>
            </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
