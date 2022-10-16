import React, { useState, useEffect, useRef } from 'react';
import {Box, Typography, Paper, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { Component } from "react";
import { StyledCell, SwappedCell }  from "./animations";
import Cell  from "../components/Cell";
import { styled } from '@mui/system';
import {BubbleSort, InsertionSort, HeapSort, QuickSort} from "../algorithms";
import "./styles.css";

class Visualize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array : [3, 5, 7, 8, 5, 1, 4, 9, 7, 1],
            delay : 1000, // 1x 1000 - 2x 500 - 4x 250 - 8x 125 - 16x 62.5
            name : "Bubble Sort",
            value: 0
        }
        this.sorts = { 
            "Bubble Sort" : () => BubbleSort(this),
            "Insertion Sort" : () => InsertionSort(this),
            "Heap Sort" : () => HeapSort(this),
            "Quick Sort" : () => QuickSort(this)
        }
        this.original = [3, 5, 7, 8, 5, 1, 4, 9, 7, 1];
        this.selected = new Array(this.state.array.length).fill(0);
        this.cells = null;

        this.handleClick = this.handleClick.bind(this);
        this.playAnimation = this.playAnimation.bind(this);
        this.resetAnimation = this.resetAnimation.bind(this);
        this.handleAlgorithmChange = this.handleAlgorithmChange.bind(this);
        this.animate = this.animate.bind(this);
        this.cellFactory = this.cellFactory.bind(this);
        this.changeSpeed = this.changeSpeed.bind(this);
        this.x = this.sorts[this.state.name]();
        this.playing = false;
    }
      
    handleAlgorithmChange(event) {
        if (event.target.value === 0)  
            this.setState({name: "Bubble Sort", value:0}, () => this.x = this.sorts[this.state.name]())
        if (event.target.value === 1) 
            this.setState({name: "Insertion Sort", value:1}, () => this.x = this.sorts[this.state.name]())
        if (event.target.value === 2) 
            this.setState({name: "Quick Sort", value:2}, () => this.x = this.sorts[this.state.name]())
        if (event.target.value === 3) 
            this.setState({name: "Heap Sort", value:3}, () => this.x = this.sorts[this.state.name]())
    }

    changeSpeed() {
        if (this.state.delay === 62.5)
            this.setState({delay : 1000});
        else
        this.setState({delay : this.state.delay/2});
    }

    animate(frames) {  // 0 for full animation, 1 for single frame
        if (this.playing === false) return;
        let nextFrame = this.x.next();
        let value = nextFrame.value;
        // console.log(this.x);

        if (value) {  
            let array = value.numbers;

            setTimeout(function() {
                // console.log(array, this.selected);
                this.setState({array: array});
                
                if (frames === 0) this.animate(0);
                else this.playing = false;
            }.bind(this), frames === 0 ? this.state.delay : 1)
        }
        else 
            this.playing = false;
    }

    handleClick() {
        if (this.playing == false) {
            this.playing = true;
            this.animate(1);
        }
    }

    playAnimation() {
        this.playing = true;
        this.animate(0);
    }

    resetAnimation() {
        this.x = this.sorts[this.state.name]();
        this.setState({array: [...this.original], delay:1000});
        this.selected = new Array(this.state.array.length).fill(0);
        // console.log(this.state.array);
        this.playing = false;
    }

    cellFactory(key, number) {
        switch(this.selected[key]) {
            case 0: return <StyledCell><Cell color={"lightblue"} number={number} key={key}></Cell></StyledCell> // Default
            case 1: return <StyledCell><Cell color={"green"} number={number} key={key}></Cell></StyledCell>     // Highlighted (currently selected)
            case 2: return <SwappedCell><Cell color={"red"} number={number} key={key}></Cell></SwappedCell>     // Freshly Swapped
            case 3: return <StyledCell><Cell color={"blue"} number={number} key={key}></Cell></StyledCell>      // In Final Sorted Position
            case 4: return <StyledCell><Cell color={"yellow"} number={number} key={key}></Cell></StyledCell>    //  Highlighted (2) (For contrast)
        }
    }
    
    render() { 
        return (  
            <Box sx={{ height: 'calc(100vh - 65px)' }} >
                <Box sx = {{margin:"auto"}} p={4}>
                    <FormControl variant="standard">
                        <InputLabel>Algorithm</InputLabel>
                        <Select
                            value={this.state.value}
                            label={this.state.name}
                            onChange={this.handleAlgorithmChange}
                        >
                            <MenuItem value={0}>Bubble Sort</MenuItem>
                            <MenuItem value={1}>Insertion Sort</MenuItem>
                            <MenuItem value={2}>Quick Sort</MenuItem>
                            <MenuItem value={3}>Heap Sort</MenuItem>
                        </Select>
                    </FormControl>                    
                </Box>

                <Box sx = {{margin:"auto", width:'100%'}}>
                    <Typography pt={1} variant="h3" align="center">{this.state.name}</Typography>
                </Box>

                <Box sx = {{display:"flex", width:'100%'}}>
                    {this.state.array && <Box margin="auto" display="flex" mt={'calc(30vh - 65px)'}>
                    {this.cells = this.state.array.map((number, key) => 
                        this.cellFactory(key, number)
                    )}
                    </Box>}
                </Box>

                <Box sx = {{display:"flex", width:'100%', mt:'calc(10vh + 30px)'}}>
                    <Box margin="auto">
                        <Button onClick={this.playAnimation}>Play Animation</Button>
                        <Button onClick={this.handleClick}>Next Frame</Button>
                        <Button onClick={this.resetAnimation}>Reset Animation</Button>
                        <Button onClick={this.changeSpeed}>{this.state.delay === 1000 ? '2x Speed'  : 
                                                            this.state.delay === 500  ? '4x Speed'  :
                                                            this.state.delay === 250  ? '8x Speed'  :
                                                            this.state.delay === 125  ? '16x Speed' : '32x Speed'}</Button>
                    </Box>
                </Box>
            </Box>
        );
    }
}
 
export default Visualize;