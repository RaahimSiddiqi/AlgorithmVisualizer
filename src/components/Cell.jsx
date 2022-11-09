import {Typography, Paper} from '@mui/material'

const Cell = ({number, id, color, width = 60, height = 60}) => {
    return ( 
        <Paper elevation={2} key={id} sx = {{width, height, backgroundColor:color, margin:'1px'}}>
            <Typography color="white" pt={2} variant="h5" align="center">{number}</Typography>
        </Paper>
     );
}
 
export default Cell;
