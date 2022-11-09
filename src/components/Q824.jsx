import React, { useState} from 'react';
import {Box, Typography, Paper, Button, Modal, FormControl, InputLabel, FormGroup,
    Switch, FormControlLabel, TextField } from '@mui/material';
import _CountingSort from '../base_algorithms/CountingSort';
import Visualize from '../pages/Visualize';
import Display from '../pages/Display';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  

const Q824 = () => {
    const [open, setOpen] = useState(true);
    const [n, setN] = useState(0);
    const [lower, setLower] = useState(0);
    const [upper, setUpper] = useState(0); 
    const [a, setA] = useState(0); 
    const [b, setB] = useState(0); 

    function handleClose(event, reason) {
        if (reason == 'backdropClick') return;
        setOpen(false);
    }

    function submit() {
        if (b < a || upper < lower) return;
        setOpen(false);
    }

    return ( 
        <>
        <Modal
            open={open}
            onClose={handleClose}
            >
            <Box sx={{ ...style,  '& .MuiTextField-root': { m: 1 }}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Enter Numbers
                </Typography>
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Enter N"
                variant="outlined"
                onChange={e => {
                    setN(parseInt(e.target.value));
                }}
              />
              <Box sx={{width:'100%', display:'flex'}}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Enter Lower Bound"
                    variant="outlined"
                    onChange={e => {
                        setLower(parseInt(e.target.value));
                    }}
                    m = {2}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Enter Upper Bound"
                    variant="outlined"
                    onChange={e => {
                        setUpper(parseInt(e.target.value));
                    }}
                    m = {2}
                />
              </Box>
              <Box sx={{width:'100%', display:'flex'}}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Enter A"
                    variant="outlined"
                    onChange={e => {
                        setA(parseInt(e.target.value));
                    }}
                    m = {2}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Enter B"
                    variant="outlined"
                    onChange={e => {
                        setB(parseInt(e.target.value));
                    }}
                    m = {2}
                />
              </Box>
              <Box>
                <Button onClick={submit}>Submit</Button>
              </Box>
            </Box>
        </Modal>
        {open == false && <Display name={"Counting Sort"} value={5} fps={10} array={Array.from(Array(n)).map(x=>Math.round(Math.random()*(upper - lower) + lower))} options={{disableToolBar:true, animateUponLoading: true, Q824: true, a:a, b:b}}></Display>}
        </>
     );
}
 
export default Q824;