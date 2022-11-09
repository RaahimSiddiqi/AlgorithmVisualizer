import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Home from '../pages/Home';
import Footer from './Footer';
import Header from './Header';
import Visualize from '../pages/Visualize';
import Q824 from './Q824';
import { Component } from "react";


class Main extends Component {
    render() { 
        return ( 
            <Router>
                <Header/>
                <Routes>
                    <Route path='/' element = {<Visualize name={"Merge Sort"} value={4} fps={1} array={Array.from(Array(16)).map(x=>Math.round(Math.random()*140))} options={{disableToolBar:false}}/>} />
                    <Route path='/Q824' element = {<Q824/>} />
                    <Route path='/Visualizer' element = {<Visualize name={"Merge Sort"} value={4} fps={1} array={Array.from(Array(16)).map(x=>Math.round(Math.random()*140))} options={{disableToolBar:false}}/>} />
                    <Route path='/Algorithms' element = {<Visualize name={"Merge Sort"} value={4} fps={1} array={Array.from(Array(16)).map(x=>Math.round(Math.random()*140))} options={{disableToolBar:false}}/>} />
                    <Route path= "*" element={<Navigate to ="/" />}/>
                </Routes>
                <Footer />
            </Router>
         );
    }
}
 
export default Main;