import React from 'react';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';


export default function Editcar(props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: '',
        model: '',
        color: '',
        fuel:'',
        year:'',
        price:''
    });

    const handleClickOpen = () => {
        setCar({
        brand: props.car.data.brand,
        model: props.car.data.model,
        color: props.car.data.color,
        fuel: props.car.data.fuel,
        year: props.car.data.year,
        price: props.car.data.price})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setCar({...car, [e.target.name]: e.target.value })
    }

    const updateCarr = () => {
        props.updateCar(car, props.car.data._links.car.href);
        handleClose()
    }

    return (
        <div>
            <Button size='small' onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        onChange={e => handleInputChange(e)}
                        label="Brand"
                        fullWidth
                    />
                <TextField
                        margin="dense"
                        name="model"
                        value={car.model}
                        onChange={e => handleInputChange(e)}
                        label="Model"
                        fullWidth
                    />
                <TextField
                        margin="dense"
                        name="color"
                        value={car.color}
                        onChange={e => handleInputChange(e)}
                        label="Color"
                        fullWidth
                    />
                <TextField
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        onChange={e => handleInputChange(e)}
                        label="Fuel"
                        fullWidth
                    />
            <TextField
                        margin="dense"
                        name="year"
                        value={car.year}
                        onChange={e => handleInputChange(e)}
                        label="Year"
                        fullWidth
                    />
                <TextField
                        margin="dense"
                        name="price"
                        value={car.price}
                        onChange={e => handleInputChange(e)}
                        label="Price"
                        fullWidth
                    />

                
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateCarr}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}