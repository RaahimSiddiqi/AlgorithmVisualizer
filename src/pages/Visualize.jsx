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

class Visualize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array : props.array,
            fps : props.fps, 
            name : props.name,
            value: props.value,
            mode : 0,
            dialog: false,
            pDialog: false,
            aux : 0,
            auxArray: null
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
        this.SIZE = props.array.length;
        this.RANGE = 130;

        this.startTime = 0
        this.endTime = 0
        this.handleClick = this.handleClick.bind(this);
        this.playAnimation = this.playAnimation.bind(this);
        this.resetAnimation = this.resetAnimation.bind(this);
        this.handleAlgorithmChange = this.handleAlgorithmChange.bind(this);
        this.animate = this.animate.bind(this);
        this.cellFactory = this.cellFactory.bind(this);
        this.changeSpeed = this.changeSpeed.bind(this);
        this.handleMode = this.handleMode.bind(this);
        this.stop = this.stop.bind(this);
        this.loadNumbersFromFile = this.loadNumbersFromFile.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.setDialog = this.setDialog.bind(this);
        this.handleDialog = this.handleDialog.bind(this);
        this.handlePerformanceDialog = this.handlePerformanceDialog.bind(this);
        this.closePerformanceDialog = this.closePerformanceDialog.bind(this);
        this.defineAuxArray = this.defineAuxArray.bind(this);
        this.auxCellFactory = this.auxCellFactory.bind(this);
        this.handleSizeAndRange = this.handleSizeAndRange.bind(this)
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

    handleSizeAndRange(event) {
        if (event.target.value === 5)  {
            if (this.RANGE != 50) 
                this.RANGE = 50;
        }
        else {
            if (this.RANGE != 130) 
                this.RANGE = 130;
            if (this.state.aux === 1) this.setState({aux : 0});
        }
        this.setState({array: this.state.array.map(x=>Math.round(Math.random()*this.RANGE))},
        () => {
            this.original = this.state.array;
        });
    }
      
    handleAlgorithmChange(event) {
        this.resetAnimation() 
        this.handleSizeAndRange(event);
        
        if (event.target.value === 0)  
            this.setState({name: "Bubble Sort", value:0}, () => this.x = this.sorts[this.state.name]())
        else if (event.target.value === 1) 
            this.setState({name: "Insertion Sort", value:1}, () => this.x = this.sorts[this.state.name]())
        else if (event.target.value === 2) 
            this.setState({name: "Quick Sort", value:2}, () => this.x = this.sorts[this.state.name]())
        else if (event.target.value === 3) 
            this.setState({name: "Heap Sort", value:3}, () => this.x = this.sorts[this.state.name]())
        else if (event.target.value === 4) 
            this.setState({name: "Merge Sort", value:4}, () => this.x = this.sorts[this.state.name]())
        else if (event.target.value === 5)
            this.setState({name: "Counting Sort", value:5}, () => {
                this.x = this.sorts[this.state.name](); 
                this.setState({aux : 1});
            })
        else if (event.target.value === 6) 
            this.setState({name: "Radix Sort", value:6}, () => this.x = this.sorts[this.state.name]())
        else if (event.target.value === 7) 
            this.setState({name: "Bucket Sort", value:7}, () => this.x = this.sorts[this.state.name]())
        else if (event.target.value === 8) 
            this.setState({name: "Quick Insertion Sort", value:8}, () => this.x = this.sorts[this.state.name]())
    }

    handleMode(event) {
        this.setState({mode:!this.state.mode}, () => {
            if (this.state.mode) {
                this.SIZE = 50;
                this.selected = new Array(this.SIZE).fill(0);
                this.setState({array: Array.from(Array(this.SIZE)).map(x=>Math.round(Math.random()*this.RANGE))},
                () => {
                    this.original = this.state.array;
                })
            }
            else {
                this.SIZE = 16;
                this.selected = new Array(this.SIZE).fill(0);
                this.setState({array: Array.from(Array(this.SIZE)).map(x=>Math.round(Math.random()*this.RANGE))},
                () =>  {
                    this.original = this.state.array;
                })
            }
        });
        this.resetAnimation() 
    }

    changeSpeed() { 
        this.resetAnimation();
        if (this.state.fps === 64)
            this.setState({fps : 1}, () => {
                console.log("current FPS ", this.state.fps);
                this.playAnimation();
        });
        else
            this.setState({fps : this.state.fps * 4}, () => {
                console.log("current FPS ", this.state.fps);
                this.playAnimation();
            });
    }

    animate = (animatorRef) => {  // 0 for full animation, 1 for single frame
        if (this.playing === false) return;
        let nextFrame = this.x.next();
        let value = nextFrame.value;

        if (value) {  
            this.setState({array: value.numbers});
        }
        else {
            this.playing = false;
            animatorRef.stop();
            this.endTime = performance.now();
            console.log("End: ", this.endTime);
            console.log("Start: ", this.startTime);
            console.log("Time taken (seconds): ", (this.endTime - this.startTime) / 1000);
            this.setState({pDialog: true});
        }
    }

    handleClick() {
        this.playing = true;
        this.animator.next();
        this.playing = false;
    }

    playAnimation() {
        this.startTime = performance.now();
        this.playing = true;
        this.animator.start();
    }

    closePerformanceDialog() {
        this.setState({pDialog: false});
    }

    handlePerformanceDialog() {
        return(
            <Dialog open={this.state.pDialog} onClose={this.closePerformanceDialog}>
            <DialogTitle>Performance Report</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Number of Seconds Taken: {((this.endTime - this.startTime) / 1000).toFixed(2)}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closePerformanceDialog}>Close</Button>
            </DialogActions>
          </Dialog>            
        )
    }

    closeDialog() {
        this.setState({dialog: false});
    }

    handleDialog(e) {
        let data = this.state.sequence.split(',');
        if (data.length > this.SIZE) {
            alert("Too many values entered!   Max:" + this.SIZE);
            return;
        }
        for(var i = 0; i < data.length; i++) 
            data[i] = parseInt(data[i]);
        this.setState({array: [...data]}, () => this.original = this.state.array);
        this.SIZE = data.length;
        this.closeDialog();
    }

    setDialog() {
        this.setState({dialog: true});
    }

    openDialog() {
        return(
            <Dialog open={this.state.dialog} onClose={this.closeDialog}>
            <DialogTitle>Enter Numbers</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter a sequence of comma separated numbers
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="e.g  1,2,3...."
                type="email"
                fullWidth
                variant="standard"
                onChange={e => {
                    this.setState({sequence: e.target.value})
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialog}>Submit</Button>
              <Button onClick={this.closeDialog}>Close</Button>
            </DialogActions>
          </Dialog>            
        )
    }

    loadNumbersFromFile(e) {
        var list;
        this.file.current.files[0].arrayBuffer()
            .then((buffer) => {
                const data = new TextDecoder('utf-8').decode(buffer);
                list = data.split(',');
                if (list.length === 1) {
                    if (data.split('\n').length > list.length)
                        list = data.split('\n');
                }

                if (list.length > this.SIZE) {
                    alert("Too many values entered!   Max:" + this.SIZE);
                    return;
                }

                
                for(var i = 0; i < list.length; i++) 
                    list[i] = parseInt(list[i]);
                this.setState({array: [...list]}, () => this.original = this.state.array);
            })
        e.target.value = '';
    }

    resetAnimation() {
        this.startTime = 0;
        this.endTime = 0;

        this.animator.stop();
        this.x = this.sorts[this.state.name]();
        this.setState({array: [...this.original]});
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
                    return <StyledCell><Cell  width={20} height={2.4 * number} color={"#0093AB"} number={''} key={key}></Cell></StyledCell> // Default
                case 1: 
                    if (this.state.value === 6) 
                        return <StyledCell><Cell width={20}  height={2.4 * number} color={"green"} number={''} key={key}></Cell></StyledCell> 
                    else
                        return <StyledCell><Cell  width={20} height={2.4 * number} color={"#0093AB"} number={''} key={key}></Cell></StyledCell> 
                case 2: 
                    return <StyledCell><Cell width={20} height={2.4 * number} color={"red"} number={''} key={key}></Cell></StyledCell>     // Freshly Swapped
                case 3: 
                    return <StyledCell><Cell width={20} height={2.4 * number} color={"blue"} number={''} key={key}></Cell></StyledCell>   
                case 4: 
                    if (this.state.value === 6) 
                        return <StyledCell><Cell  width={20} height={2.4 * number} color={"#FFD700"} number={''} key={key}></Cell></StyledCell>  
                    else
                        return <StyledCell><Cell  width={20} height={2.4 * number} color={"#0093AB"} number={''} key={key}></Cell></StyledCell> 
                default:  
                    return <StyledCell><Cell  width={20} height={2.4 * number} color={this.selected[key]} number={''} key={key}></Cell></StyledCell> // Default
            }
        }
        else {
            switch(this.selected[key]) {
                case 0: return <StyledCell><Cell  color={"#0093AB"} number={number} key={key}></Cell></StyledCell> // Default
                case 1: return <StyledCell><Cell  color={"green"} number={number} key={key}></Cell></StyledCell>     // Highlighted (currently selected)
                case 2: return <SwappedCell><Cell color={"red"} number={number} key={key}></Cell></SwappedCell>     // Freshly Swapped
                case 3: return <StyledCell><Cell  color={"blue"} number={number} key={key}></Cell></StyledCell>      // In Final Sorted Position
                case 4: return <StyledCell><Cell  color={"#FFD700"} number={number} key={key}></Cell></StyledCell>    //  Highlighted (2) (For contrast)
                default:  return <StyledCell><Cell  color={this.selected[key]} number={number} key={key}></Cell></StyledCell>
            }
        }
    }
    
    render() { 
        return (  
            <Box sx={{ height: 'calc(100vh - 65px)' }} >
                {this.state.pDialog && this.handlePerformanceDialog()}
                {this.state.dialog && this.openDialog()}
                <Box sx = {{ width:"100%", display:"flex", height:'15%'}}>
                    <Box sx = {{mr:"auto"}} p={4}>
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
                                <MenuItem value={4}>Merge Sort</MenuItem>
                                <MenuItem value={5}>Counting Sort</MenuItem>
                                <MenuItem value={6}>Radix Sort</MenuItem>
                                <MenuItem value={7}>Bucket Sort</MenuItem>
                                <MenuItem value={8}>Quick Insertion Sort</MenuItem>
                            </Select>
                        </FormControl>                    
                    </Box>

                    <Box pt={5}>
                        <FormGroup>
                            <FormControlLabel control={<Switch onChange={this.handleMode} size="large"/>} label="Advanced Mode" />
                        </FormGroup>
                    </Box>
                </Box>

                <Box sx = {{display:"flex", alignItems:"flex-end", width:'100%', height: this.state.aux === 0 ?'70%' : '55%'}}>
                    {this.state.array && <Box margin="auto" display="flex" alignItems="flex-end">
                    {this.cells = this.state.array.map((number, key) => 
                        this.cellFactory(key, number)
                    )}</Box>}
                </Box>
                <Box sx = {{display:"flex", alignItems:"flex-end", width:'100%', height: this.state.aux === 0 ?'0%' : '15%'}}>
                    {this.state.aux === 1 && this.state.auxArray && <Box margin="auto" sx={{display:"flex", alignItems:"flex-end"  }}>
                        {this.state.auxArray.map((number, key) => 
                            this.auxCellFactory(key, number)
                        )}                        
                    </Box>}
                </Box>
                
                { this.options.disableToolBar == false &&
                <Paper elevation={4} sx = {{display:"flex", width:'100%', bgcolor:"lightblue", height:'15%'}}>
                    <Box margin="auto">
                        <Button component="label" sx={{margin:'8px'}} variant="contained">Load Numbers from File
                            <input accept='.txt' multiple hidden type='file' ref={this.file} onChange={this.loadNumbersFromFile}></input>
                        </Button>
                        <Button sx={{margin:'8px'}} variant="contained"  onClick={this.setDialog}>Enter Numbers</Button>
                    </Box>
                    <Box margin="auto">
                        <Button sx={{margin:'8px'}} variant="contained" onClick={this.playAnimation}>Play Animation</Button>
                        <Button sx={{margin:'8px'}} variant="contained" onClick={this.handleClick}>Next Frame</Button>
                        <Button sx={{margin:'8px'}} variant="contained" onClick={this.resetAnimation}>Reset Animation</Button>
                        <Button sx={{margin:'8px'}} variant="contained" onClick={this.changeSpeed}>{this.state.fps === 1 ? '2x Speed'  : 
                                                            this.state.fps === 4  ? '4x Speed'  :
                                                            this.state.fps === 16  ? '8x Speed'  : 
                                                            this.state.fps === 64 ? '16x Speed' : '32x Speed'}</Button>
                    </Box>
                </Paper>
                }
            </Box>
        );
    }
}
 
export default Visualize;