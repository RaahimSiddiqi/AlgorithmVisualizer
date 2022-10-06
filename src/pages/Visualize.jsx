import React, { useState, useEffect, useRef } from 'react';
import { Box} from '@mui/material';
import {Bubblesort} from "../algorithms"

const Visualize = () => {
    const [algorithm, setAlgorithm] = useState(0);

    return ( 
        <Box sx={{ height: 'calc(100vh - 65px)' }} >
            {algorithm === 0 && <Bubblesort></Bubblesort>}
        </Box>
    );
}
 
export default Visualize;