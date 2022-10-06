import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Home from '../pages/Home';
import Footer from './Footer';
import Header from './Header';
import Visualize from '../pages/Visualize';
import { Component } from "react";


class Main extends Component {
    render() { 
        return ( 
            <Router>
                <Header/>
                <Routes>
                    <Route path='/' element = {<Home/>} />
                    <Route path='/Visualizer' element = {<Visualize/>} />
                    <Route path='/Algorithms' element = {<Visualize/>} />
                    <Route path= "*" element={<Navigate to ="/" />}/>
                </Routes>
                <Footer />
            </Router>
         );
    }
}
 
export default Main;