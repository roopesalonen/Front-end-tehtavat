import React from 'react';
import '../App.css';

export default function TodoTable(props) {
    return (
        <div>
            <table>
                <thead class="bold">
                    <tr>
                        <td>Description</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.todos.map((todo, index) =>
                            <tr key={index}>
                                <td>{todo.desc}</td>
                                <td>{todo.date}</td>
                                <td><button onClick={() => props.deleteTodo(index)}>Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}