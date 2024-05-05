import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './MyGridComponent.css'; // Import your CSS file
import SingleRowEditWidget from './SingleRowEditWidget';
import YearMultiEditWidget from './YearMultiEditWidget';
import ExchangeListBox from "./exchangeSelection";

const MyGridComponent = () => {

    var initialPeople = [
        { person_id: "id1", make: 'Toyota', model: 'Celica', price: 35000, year: 2022 },
        { person_id: "id2", make: 'Ford', model: 'Mondeo', price: 32000, year: 2021 },
        { person_id: "id3", make: 'Porsche', model: 'Boxster', price: 72000, year: 2020 },
        { person_id: "id4", make: 'Test', model: 'DDDD', price: 72000, year: 2020 }
     ]
    const [people, setPeople] = useState(initialPeople);

    const handleRefresh = () => {
        //var old = selectedRows.map(selectedRow => people.find(person => person.id === selectedRow.id))
        //setSelectedRows(old);

        setPeople(initialPeople);
    };
    const [selectedRows, setSelectedRows] = useState([]);


    const gridApiRef = useRef(null);


    const columnDefs = [
        { headerName: '', checkboxSelection: true, width: 50 }, // Checkbox column
        { headerName: 'Make', field: 'make' },
        { headerName: 'Model', field: 'model', filter: "agSetColumnFilter" }, // Use custom filter
        { headerName: 'Price', field: 'price' },
        { headerName: 'Year', field: 'year' }
    ];


   // useEffect(() => {
   //     gridApiRef.current?.onFilterChanged();
   // }, [people]);

    // useEffect(() => {
    //     //updateSelecledtedRows()
    // }, [people]);

    const getRowNodeId = (data) => {
        // Return the unique identifier for each row (person_id)
        return data.data.person_id;
    };
    const updateSelecledtedRows = ()=>{
        if (gridApiRef.current) {
            // Simulate onGridReady logic on data refresh
            //gridApiRef.current.sizeColumnsToFit();
            // Restore selection state on grid load
            selectedRows.forEach(row => {
                const node = gridApiRef.current.getRowNode(row.person_id);
                if (node) {
                    node.setSelected(true);
                }
            });
        }
    }


    const onGridReady = (params) => {
        gridApiRef.current = params.api;
        params.api.sizeColumnsToFit();
    };


    const handleSaveSingleRow = (editedData) => {
        const updatedRows = people.map(row => row.person_id === editedData.person_id ? editedData : row);
        setPeople(updatedRows);
    };

    const handleSaveYearForMultipleRows = (year) => {
        const updatedRows = people.map(row => selectedRows.includes(row.person_id) ? { ...row, year: year } : row);
        setPeople(updatedRows);
    };
    // const selectRow = (id) => {
    //     if (gridApiRef.current) {
    //         const rowNode = gridApiRef.current.getRowNode(id);
    //         if (rowNode) {
    //             rowNode.setSelected(true);
    //         }
    //     }
    // };


    return (
        <div>
            <div className="ag-theme-alpine" style={{ height: '200px', width: '600px', marginBottom: '20px' }}>
                <div>
                    <ExchangeListBox />
                </div>

                <AgGridReact
                    rowData={people}
                    columnDefs={columnDefs}
                    //rowSelection="multiple"
                    getRowId={getRowNodeId}
                    onSelectionChanged={(event) => {

                        const selectedNodes = event.api.getSelectedNodes();
                        const selectedIds = selectedNodes.map(node => node.data.person_id);
                        const newlySelectedRows = people.filter(person => selectedIds.includes(person.person_id));
                        //const updatedSelectedRows = [...selectedRows, ...newlySelectedRows];
                        setSelectedRows(newlySelectedRows);


                        //setSelectedRows(selectedIds);
                        // var updated = people.filter(selectedRow => selectedIds.includes(selectedRow.person_id))
                        // setSelectedRows(updated);

                    }}
                    onGridReady={onGridReady}
                />
                <button onClick={handleRefresh}>Refresh</button>
                {/*<button onClick={() => selectRow(1)}>Select Row 1</button>*/}

            </div>

            {selectedRows.length === 1 && (
                <SingleRowEditWidget
                    rowData={selectedRows[0]}
                    onSave={handleSaveSingleRow}
                />
            )}
            {selectedRows.length > 1 && (
                <YearMultiEditWidget onSave={handleSaveYearForMultipleRows} />
            )}
        </div>
    );
};

export default MyGridComponent;
