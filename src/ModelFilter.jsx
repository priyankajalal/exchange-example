// ModelFilter.jsx

import React, { useState, useEffect } from 'react';

const ModelFilter = ({ column, api }) => {
    const [models, setModels] = useState([]);

    useEffect(() => {
        const uniqueModels = new Set(api.getRenderedNodes().map(node => node.data.model));
        setModels(Array.from(uniqueModels));
    }, [api]);

    const handleChange = (event) => {
        const selectedModel = event.target.value;
        api.setFilterModel({ [column.colId]: { type: 'equals', filter: selectedModel } });
    };

    return (
        <select onChange={handleChange}>
            <option value="">All</option>
            {models.map((model, index) => (
                <option key={index} value={model}>{model}</option>
            ))}
        </select>
    );
};

export default ModelFilter;
