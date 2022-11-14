import React from 'react';
import {Box, Typography, Paper, Button, MenuItem, Select, FormControl, InputLabel, FormGroup,
        Switch, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle,
        DialogContentText, TextField } from '@mui/material'
import { Component } from "react";
import { StyledCell, SwappedCell}  from "./animations";
import Cell  from "../components/Cell";
import {BubbleSort, InsertionSort, HeapSort, QuickSort, MergeSort, 
       CountingSort, RadixSort, QuickInsertionSort, BucketSort} from "../algorithms";
import Animator from "../utils/Animator";
import "./styles.css";
import { createRef } from 'react';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array : props.array,
            fps : props.fps, 
            name : props.name,
            value: props.value,
            mode : 1,
            dialog: false,
            aux : 0,
            auxArray: null,
            result : false,
            resultArray : null
        }
        this.sorts = { 
            "Bubble Sort" : () => BubbleSort(this),
            "Insertion Sort" : () => InsertionSort(this),
            "Quick Sort" : () => QuickSort(this),
            "Heap Sort" : () => HeapSort(this),
            "Merge Sort" : () => MergeSort(this),
            "Counting Sort" : () => CountingSort(this),
            "Radix Sort" : () => RadixSort(this),
            "Bucket Sort" : () => BucketSort(this),
            "Quick Insertion Sort" : () => QuickInsertionSort(this)
        }
        this.original = [...this.state.array];
        this.selected = new Array(this.state.array.length).fill(0);
        this.auxSupportingArray = null;
        this.cells = null;
        this.x = this.sorts[this.state.name]();
        this.playing = false;
        this.animator = new Animator(this, this.animate)
        this.file = createRef(null);
        this.sequence = '';
        this.options = props.options;

        this.playAnimation = this.playAnimation.bind(this);
        this.resetAnimation = this.resetAnimation.bind(this);
        this.animate = this.animate.bind(this);
        this.cellFactory = this.cellFactory.bind(this);
        this.stop = this.stop.bind(this);
        this.defineAuxArray = this.defineAuxArray.bind(this);
        this.auxCellFactory = this.auxCellFactory.bind(this);
    }

    componentDidMount() {
        this.setState({aux : 1});
        if (this.options.animateUponLoading && this.options.animateUponLoading === true) {
            this.playing = true;
            this.animator.start();
        }
    }

    stop() {
        this.animator.stop();
    }

    animate = (animatorRef) => {  // 0 for full animation, 1 for single frame
        if (this.playing === false) return;
        let nextFrame = this.x.next();
        let value = nextFrame.value;
    
        if (value) {  
            this.setState({array: value.numbers});
            if (value.counts) {
                this.setState({resultArray: value.counts})
                console.log(value.counts);
            }
        }
        else {
            this.playing = false;
            this.setState({result: true})
            let upper = Math.min(this.options.b, this.state.array[this.state.array.length - 1])
            let offset = 0;

            if (this.options.a === 0) {
                offset = this.state.resultArray[0] - 0;
            }

            if (this.options.a === 0 && upper === this.state.array.length) {
                this.setState({resultArray: [this.options.a, upper, this.state.array.length]});
            }
            else if (this.options.a === 0) {
                this.setState({resultArray: [this.options.a, this.options.b, this.state.resultArray[upper] - this.state.resultArray[this.options.a] + offset]});
            }
            else {
                this.setState({resultArray: [this.options.a, this.options.b, this.state.resultArray[upper] - this.state.resultArray[this.options.a - 1] + offset]});
            }
            animatorRef.stop();
        }

    }

    playAnimation() {
        this.playing = true;
        this.animator.start();
    }

    resetAnimation() {
        this.animator.stop();
        this.x = this.sorts[this.state.name]();
        this.setState({array: [...this.original], fps: 1});
        this.selected = new Array(this.state.array.length).fill(0);
        if (this.auxSupportingArray != null) this.auxSupportingArray.fill(0);
        this.playing = false;
    }

    auxCellFactory(key, number) {
        return(
            <Box>
                <StyledCell><Cell  width={20} height={this.auxSupportingArray[key] * 1.5} color={"#0093AB"} number={''} key={key}></Cell></StyledCell>
                <Typography>{this.auxSupportingArray[key]}</Typography>
            </Box>
        )
    } 

    defineAuxArray(n) {
        this.auxSupportingArray = Array(n).fill(0)
        this.setState({auxArray : Array(n).fill(0)})
    }

    cellFactory(key, number) {
        if (this.state.mode) {
            switch(this.selected[key]) {
                case 0: 
                    return <StyledCell><Cell  width={20} height={2.5 * number} color={"#0093AB"} number={''} key={key}></Cell></StyledCell> // Default
                case 1: 
                    if (this.state.value === 6) 
                        return <StyledCell><Cell width={20}  height={2.5 * number} color={"green"} number={''} key={key}></Cell></StyledCell> 
                    else
                        return <StyledCell><Cell  width={20} height={2.5 * number} color={"#0093AB"} number={''} key={key}></Cell></StyledCell> 
                case 2: 
                    return <StyledCell><Cell width={20} height={2.5 * number} color={"red"} number={''} key={key}></Cell></StyledCell>     // Freshly Swapped
                case 4: 
                    if (this.state.value === 6) 
                        return <StyledCell><Cell  width={20} height={2.5 * number} color={"#FFD700"} number={''} key={key}></Cell></StyledCell>  
                    else
                        return <StyledCell><Cell  width={20} height={2.5 * number} color={"#0093AB"} number={''} key={key}></Cell></StyledCell> 
                default:  
                    return <StyledCell><Cell  width={20} height={2.5 * number} color={this.selected[key]} number={''} key={key}></Cell></StyledCell> // Default
            }
        }
        else {
            switch(this.selected[key]) {
                case 0: return <StyledCell><Cell  width={50}color={"#0093AB"} number={number} key={key}></Cell></StyledCell> // Default
                case 1: return <StyledCell><Cell  width={50}color={"green"} number={number} key={key}></Cell></StyledCell>     // Highlighted (currently selected)
                case 2: return <SwappedCell><Cell width={50}color={"red"} number={number} key={key}></Cell></SwappedCell>     // Freshly Swapped
                case 3: return <StyledCell><Cell  width={50}color={"blue"} number={number} key={key}></Cell></StyledCell>      // In Final Sorted Position
                case 4: return <StyledCell><Cell  width={50}color={"#FFD700"} number={number} key={key}></Cell></StyledCell>    //  Highlighted (2) (For contrast)
                default:  return <StyledCell><Cell  width={50} color={this.selected[key]} number={number} key={key}></Cell></StyledCell>
            }
        }
    }
    
    render() { 
        return (  
            <Box sx={{ height: 'calc(100vh - 65px)' }} >
                {this.state.dialog && this.openDialog()}
                <Box sx = {{display:"flex", width:'100%', height: this.state.aux === 0 ?'70%' : '55%'}}>
                    {this.state.array && <Box margin="auto" display="flex">
                    {this.cells = this.state.array.map((number, key) => 
                        this.cellFactory(key, number)
                    )}</Box>}
                </Box>
                <Box sx = {{display:"flex", width:'100%', height: this.state.aux === 0 ?'0%' : '15%'}}>
                    {this.state.aux === 1 && this.state.auxArray && <Box margin="auto" sx={{display:"flex"}}>
                        {this.state.auxArray.map((number, key) => 
                            this.auxCellFactory(key, number)
                        )}                        
                    </Box>}
                </Box>
                {this.state.result && 
                <Box sx= {{ width:'100%', display:"flex", p:1}}>
                    <Box sx={{margin:"auto", display:"flex"}}>
                    <Typography m={2}>{"A: " + this.state.resultArray[0]}</Typography>
                    <Typography m={2}>{"B: "+ this.state.resultArray[1]}</Typography>
                    <Typography m={2}>{"Number of Values in this Range: " + this.state.resultArray[2]}</Typography>
                    </Box>
                </Box>
                }
            </Box>
        );
    }
}
 
export default Display;