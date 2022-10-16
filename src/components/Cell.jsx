import {Box, Divider, Grid, Stack, Typography, Paper, Button, IconButton } from '@mui/material'

const Cell = ({number, id, color}) => {
    return ( 
        <Paper sx = {{width:80, height:80, backgroundColor:color, m:1}}>
            <Typography pt={2} variant="h4" align="center">{number}</Typography>
        </Paper>
     );
}
 
export default Cell;
