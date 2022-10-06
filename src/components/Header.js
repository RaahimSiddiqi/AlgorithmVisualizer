import {AppBar, Toolbar, Typography, Button, IconButton, Stack,
        Drawer, Box, Tooltip, Menu, MenuItem } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'

const links = [
    {name:"Home", path:"/"},
    {name:"Algorithms", path:"/Algorithms"},
    {name:"Visualizer", path:"/Visualizer"},
  ]


function Header(props) {
    const navigate = useNavigate();
    
    return (
      <AppBar color='transparent' position='static' sx={{m: 0}}>
        <Toolbar>       
          <Typography variant="h6" component='div' sx={{flexGrow:1}}>Algorithm Visualizer</Typography>
          <Stack direction="row" spacing={2} sx={{ display : { xs : 'none', md : 'flex'}}}>
            {
              links.map((item, key) =>
                <Button 
                  color="inherit" 
                  key={key} 
                  onClick={()=>navigate(item.path)} 
                  sx= "5px solid gray"
                >
                  {item.name}
                </Button>
              )
            }
          </Stack>
        </Toolbar>
      </AppBar>
    );
  }
  export default Header;