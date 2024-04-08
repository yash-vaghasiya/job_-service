import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from '@mui/material';
import { addDataToBackend, fetchJobsFromBackend } from '../actions';

const UserJobDialog = ({ open, setOpen }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'submitted' 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    useEffect(() => {
        fetchJobsFromBackend();
      }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addDataToBackend(formData);
            if(res.ok){
                setOpen(false); 
                fetchJobsFromBackend();
                setFormData({ 
                    name: '',
                    description: '',
                    status: 'submitted'
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData?.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData?.description}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="status"
                        name="status"
                        label="Status"
                        select
                        fullWidth
                        variant="outlined"
                        value={formData?.status}
                        onChange={handleChange}
                    >
                        <MenuItem value="submitted">Submitted</MenuItem>
                        <MenuItem value="in_progress">In progress</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="closed">Closed</MenuItem>
                        <MenuItem value="finished">Finished</MenuItem>
                        <MenuItem value="canceled">Canceled</MenuItem>
                        <MenuItem value="failed">Failed</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type='submit'>{formData._id ? 'Update' : 'Submit'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UserJobDialog;
