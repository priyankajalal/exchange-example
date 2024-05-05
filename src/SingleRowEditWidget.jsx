import React, { useState } from 'react';

const SingleRowEditWidget = ({ rowData, onSave }) => {
    const [editedData, setEditedData] = useState(rowData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSaveClick = () => {
        onSave(editedData);
    };

    return (
        <div>
            <h3>Edit Row</h3>
            <label>Make:</label>
            <input type="text" name="make" value={editedData.make} onChange={handleInputChange} /><br />
            <label>Model:</label>
            <input type="text" name="model" value={editedData.model} onChange={handleInputChange} /><br />
            <label>Price:</label>
            <input type="number" name="price" value={editedData.price} onChange={handleInputChange} /><br />
            <label>Year:</label>
            <input type="number" name="year" value={editedData.year} onChange={handleInputChange} /><br />
            <button onClick={handleSaveClick}>Save</button>
        </div>
    );
};

export default SingleRowEditWidget;
