import React, { useState } from 'react';
import { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import './App.css';

function App() {
  const [todo, setTodo] = useState({ desc: '', date: '', priority: '' });
  const [todos, setTodos] = useState([]);

  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  }

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  }

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) =>
        index != gridRef.current.getSelectedNodes()[0].id))
    }
    else {
      alert('Select row first');
    }
  };

  const columns = [
    { headerName: "Date", field: "date", sortable: true, filter: true, floatingFilter: true, flex: 1, suppressMovable: true},
    { headerName: "Description", field: "desc", sortable: true, filter: true, floatingFilter: true, flex: 1, suppressMovable: true},
    {
      headerName: "Priority", field: "priority", sortable: true, filter: true, floatingFilter: true, flex: 1, suppressMovable: true,
      cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' },
    }
  ]

  return (
    <div className="App">
      <input type="date" name="date" value={todo.date} onChange={inputChanged} />
      <input type="text" placeholder="Description" name="desc" value={todo.desc} onChange={inputChanged} />
      <input type="text" placeholder="Priority " name="priority" value={todo.priority} onChange={inputChanged} />
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>
      <div className="ag-theme-material" style={{ height: '700px', width: '60%', margin: 'auto' }} >
        <AgGridReact
          ref={gridRef}
          onGridReady={params => gridRef.current = params.api}
          rowSelection="single"
          animateRows="true"
          columnDefs={columns}
          rowData={todos}>
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
