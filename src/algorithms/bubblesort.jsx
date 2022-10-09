import React, { useState, useEffect, useRef } from 'react';
import {Box, Divider, Grid, Stack, Typography, Paper, Button, IconButton } from '@mui/material'
import { Component } from "react";
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import Icon from '@mui/material/Icon';
import "./source.css";

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}


class BubbleSort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array : [3, 5, 7, 8, 5, 1, 4, 9, 7, 1],
            name : "BubbleSort"
        }
        this.original = [3, 5, 7, 8, 5, 1, 4, 9, 7, 1];
        this.numbers = [];

        this.sort = this.sort.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.nextFrame = this.nextFrame.bind(this);
        this.playAnimation = this.playAnimation.bind(this);
        this.resetAnimation = this.resetAnimation.bind(this);
        this.animate = this.animate.bind(this);
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
            yield {array:array, i:i, j:j};
        }
    }

    animate(delay) {
        let value = this.x.next().value;
        if (value) {
            let array = value.array;
            let i = value.i;
            let j = value.j;
            setTimeout(function() {
                this.setState({array: array});
                this.animate(delay);
            }.bind(this), delay)
        }
    }

    nextFrame(delay) {
        console.log(this.numbers);
        let value = this.x.next().value;
        if (value) {
            let array = value.array;
            setTimeout(function() {
                this.setState({array: array});
            }.bind(this), delay)
        }
    }

    handleClick() {
        this.nextFrame(0);
    }

    playAnimation() {
        this.animate(1000);
    }

    resetAnimation() {
        this.x = this.sort();
        console.log(this.original)
        this.setState({array: [...this.original]});
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
                    this.numbers = this.state.array.map((number, key) => 
                    <Paper key={key} sx = {{width:80, height:80, backgroundColor:"lightblue", m:1}}>
                        <Typography pt={2} variant="h4" align="center">{number}</Typography>
                    </Paper>
                    )}
                    </Box>
                </Box>

                <Box sx = {{display:"flex", width:'100%', mt:'calc(10vh + 30px)'}}>
                    <Box margin="auto">
                        <Button onClick={this.playAnimation}>Play Animation</Button>
                        <Button onClick={this.handleClick}>Next Frame</Button>
                        <Button onClick={this.resetAnimation}>Reset Animation</Button>
                    </Box>
                </Box>
            </Box>
        );
    }
}
 
export default BubbleSort;