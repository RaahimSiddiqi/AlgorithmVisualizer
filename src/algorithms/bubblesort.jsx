import React, { useState, useEffect, useRef } from 'react';
import {Box, Divider, Grid, Stack, Typography, Paper, Button, IconButton } from '@mui/material'
import { Component } from "react";
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import Icon from '@mui/material/Icon';


class BubbleSort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array : [3, 5, 7, 8, 5, 1, 4, 9, 7, 1],
            name : "BubbleSort"
        }
        this.sort = this.sort.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.x = this.sort();
    }

    *sort() { 
        let array = this.state.array;
        for(var i = 0; i < array.length; i++){
            for(var j = 0; j < ( array.length - i -1 ); j++){
                    if (array[j] > array[j+1]) {
                    var temp = array[j]
                    array[j] = array[j + 1]
                    array[j+1] = temp
                }
            }
            yield array;
        }
    }

    handleClick() {
        let value = this.x.next().value;
        this.setState({array: value});
    }
    
    render() { 
        return (  
            <Box>
                <Box sx = {{margin:"auto", width:'100%'}}>
                    <Typography pt={2} variant="h3" align="center">{this.state.name}</Typography>
                </Box>

                <Box sx = {{display:"flex", width:'100%'}}>
                    <Box margin="auto" display="flex" mt={'calc(40vh - 65px)'}>
                    {
                    this.state.array.map((number, key) => 
                    <Paper sx = {{width:80, height:80, backgroundColor:"lightblue", m:1}}>
                        <Typography pt={2} variant="h4" align="center">{number}</Typography>
                    </Paper>
                    )}
                    </Box>
                </Box>

                <Box sx = {{display:"flex", width:'100%', mt:'calc(10vh + 30px)'}}>
                    <Box margin="auto">
                        <IconButton onClick={this.handleClick} size="large"><FastForwardRoundedIcon/></IconButton>
                        <IconButton size="large"><ArrowRightRoundedIcon /></IconButton>
                        <IconButton size="large"><ArrowRightRoundedIcon /></IconButton>
                        <IconButton size="large"><FastForwardRoundedIcon /></IconButton>
                    </Box>
                </Box>
            </Box>
        );
    }
}
 
export default BubbleSort;