import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './MyGridComponent.css'; // Import your CSS file
import React, { useState } from 'react';

const YearMultiEditWidget = ({ onSave }) => {
    const [newYear, setNewYear] = useState('');

    const handleYearChange = (event) => {
        setNewYear(event.target.value);
    };

    const handleSaveClick = () => {
        onSave(parseInt(newYear));
    };

    return (
        <div>
            <h3>Edit Year for Multiple Rows</h3>
            <label>New Year:</label>
            <input type="number" value={newYear} onChange={handleYearChange} /><br />
            <button onClick={handleSaveClick}>Save Year</button>
        </div>
    );
};

export default YearMultiEditWidget;
