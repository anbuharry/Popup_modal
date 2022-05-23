import React, { useState } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from '@material-ui/core';
import FormDialog from './dialog';
const initialValue = { Company: "", Floor: "", Group: "", camera: "" }

function App() {

  const actionButton = (params) => {
    setOpen(true)
  }
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue)

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue)
  };

  const columnDefs = [
    { headerName: "Company", field: "Company_Name" },
    { headerName: "Floor", field: "Floor Number", },
    { headerName: "Group", field: "Group_Name", },
    { headerName: "camera", field: "Camera_Number" },
    {
      headerName: "Button", field: "Video_Name", cellRendererFramework: (params) => <div>
        <Button variant="contained" size="medium" color="primary" onClick={() => actionButton(params)} >Play </Button>


      </div>

    }

  ]
  const defaultColDef = {
    sortable: true,
    editable: false,
    flex: 1, filter: true,
    floatingFilter: true
  }

  const onGridReady = (params) => {
    console.log("grid is ready")
    fetch("http://localhost:4000/posts").then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        params.api.applyTransaction({ add: resp })
      })
  }
  //fetching user data from server

  const onChange = (e) => {
    const { value, id } = e.target
    // console.log(value,id)
    setFormData({ ...formData, [id]: value })
  }
  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a user 
      console.log("hai")

    } else {

    }
  }

  return (
    <div className="App">
      <h1 align="center">React-API</h1>
      <h3>API Details</h3>
      <div className="ag-theme-alpine" style={{ height: '400px' }}>
        <AgGridReact
          columnDefs={columnDefs}
          // rowData={rowData}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}>
        </AgGridReact>
      </div>
      <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;