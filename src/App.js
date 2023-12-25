//import logo from './logo.svg';
//import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
     state={
      progress: 0
     }
     //apiKey=process.env.REACT_NEWS_APIKEY;
    setProgress=(progress)=>{
      this.setState({progress:progress})
    }
  render() {
    return (
      <div>
       
       
       <Router> 
       <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Navbar/>
         
        <Routes>
        <Route path='/' element={<News setProgress={this.setProgress} pagesize={10} key='general' country='in' category='general' bdgeColor='primary'/>}></Route>
        <Route path='/science' element={<News setProgress={this.setProgress} key='science' pagesize={10} country='in' category='science' bdgeColor='info'/>}></Route>
        <Route path='/general' element={<News setProgress={this.setProgress} pagesize={10} key='general' country='in' category='general' bdgeColor='primary'/>}></Route>
        <Route path='/technology' element={<News setProgress={this.setProgress} pagesize={10} key='technology' country='in' category='technology' bdgeColor='secondary'/>}></Route>
        <Route path='/health' element={<News setProgress={this.setProgress} pagesize={10} key='health' country='in' category='health' bdgeColor='danger'/>}></Route>
        <Route path='/sports' element={<News setProgress={this.setProgress} pagesize={10} key='sports' country='in' category='sports' bdgeColor='success'/>}></Route>
        <Route path='/entertainment' element={<News setProgress={this.setProgress} pagesize={10} key='entertainment' country='in' category='entertainment' bdgeColor='warning'/>}></Route>
        <Route path='/business' element={<News setProgress={this.setProgress} pagesize={10} key='business' country='in' category='business' bdgeColor='dark'/>}></Route>
        </Routes>
       
      </Router>
      </div>
    )
  }
}
