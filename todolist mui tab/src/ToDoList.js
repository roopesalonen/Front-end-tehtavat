import React, { useState } from 'react';
import { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function ToDoList() {
  const [todo, setTodo] = useState({ desc: '', date: '', priority: '' });
  const [todos, setTodos] = useState([]);

  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  }

  const dateChanged = (d) => {
    setTodo({...todo, date: d});
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
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker onChange={date => dateChanged(date)} name="date"/>
      </LocalizationProvider>
      <TextField placeholder="Description" name="desc" value={todo.desc} onChange={inputChanged}/>
      <TextField placeholder="Priority " name="priority" value={todo.priority} onChange={inputChanged}/>
      <Button onClick={addTodo} variant="contained">Add</Button>
      <Button onClick={deleteTodo} variant="contained">Delete</Button>
      </Stack>
      
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

export default ToDoList;