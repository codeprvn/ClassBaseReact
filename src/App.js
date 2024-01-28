import './App.css';

import React, { Component } from 'react'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import NavBar from './component/NavBar';
import News from './component/News';

export class App extends Component {

  state ={ progress:0}
  
 setProgress =  (progress) =>{
  this.setState({progress:progress})
}

  render() {
    return (
      <Router>
        
        <div>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={4}
      />
          <NavBar />
   
      </div>

        <Routes>
          <Route exact path="/" element={<News setprogress={this.setProgress} key="general" pageSize={10} category="general"/>}/>
          <Route exact path="/business" element={<News setprogress={this.setProgress} key="business" pageSize={10} category="business"/>}/>
          <Route exact path="/entertainment" element={<News setprogress={this.setProgress} key="entertainment" pageSize={10} category="entertainment"/>}/>
          <Route exact path="/health" element={<News setprogress={this.setProgress} key="health" pageSize={10} category="health"/>}/>
          <Route exact path="/science" element={<News setprogress={this.setProgress} key="science" pageSize={10} category="science"/>}/>
          <Route exact path="/sports" element={<News setprogress={this.setProgress} key="sports" pageSize={10} category="sports"/>}/>
          <Route exact path="/technology" element={<News setprogress={this.setProgress} key="technology" pageSize={10} category="technology"/>}/>
                   
        </Routes>

      </Router>
      
    )
  }
}

export default App
