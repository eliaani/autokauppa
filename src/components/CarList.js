import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Button from '@mui/material/Button';
import Addcar from './Addcar';
import Editcar from './Editcar';

export default function CarList(props) {
    const [cars, setCars] = useState([]);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
    }

    const columns = [
        {
            headerName: 'Brand',
            field: 'brand',
            sortable: true,
            filter: true,
            floatingFilter: true,
            width: 'auto',
        },
        {
            headerName: 'Model',
            field: 'model',
            sortable: true,
            filter: true,
            floatingFilter: true,
            width: 'auto',
        },
        {
            headerName: 'Color',
            field: 'color',
            sortable: true,
            filter: true,
            floatingFilter: true,
            width: 'auto',
        },
        {
            headerName: 'Fuel',
            field: 'fuel',
            sortable: true,
            filter: true,
            floatingFilter: true,
            width: 'auto',
        },
        {
            headerName: 'Year',
            field: 'year',
            sortable: true,
            filter: true,
            floatingFilter: true,
            width: '90px',
        },
        {
            headerName: 'Price',
            field: 'price',
            sortable: true,
            filter: true,
            floatingFilter: true,
            width: '90px',
        },
        {
            headerName: '',
            field: '_links.self.href',
            cellRenderer: props => <Editcar updateCar={updateCar} car={props}/>
        },
        {
            headerName: '',
            field: '_links.self.href',
            cellRenderer: props => <Button size='small' color='secondary' onClick={() => deleteCar(props.value)}>Delete</Button>,
            width: '90px',
        }
    ]
    const deleteCar = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, { method: 'DELETE' })
                .then(res => fetchData())
                .catch(err => console.error(err))
        }

    }

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        }) 
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    useEffect(() => fetchData(), []);

    return (
        <div className="ag-theme-material" style={{ width: '1500px', height: '100vh', margin: 'auto' }}>
            <Addcar saveCar={saveCar}/>
            <AgGridReact
                columnDefs={columns}
                rowData={cars}
            >
            </AgGridReact>
        </div>
    );


}