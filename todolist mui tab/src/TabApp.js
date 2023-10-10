import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ToDoList from './ToDoList';


function TabApp() {

    const [value, setValue] = useState('one');

    const handleChange = (event, value) => {
        setValue(value);
    };

    return (
    <div>
        <Tabs value={value} onChange={handleChange}>
            <Tab value="one" label="Home" />
            <Tab value="two" label="ToDoList" />
        </Tabs>

        {value === 'one' &&
        <div>
            <h1>Hello!</h1>
            <p>Nothing interesting on this page.</p>
        </div>
        }

        {value === 'two' &&
        <div>
            <ToDoList/>
        </div>
        }
    </div>
    );
}

export default TabApp;