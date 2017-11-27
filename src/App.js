import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import list from './list.js';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      list: list
    };
    this.removeItem = this.removeItem.bind(this);
  }

  /*removeItem(_id) {
    console.log("Remove Item: "+_id);
    // using javascript filter method
    // we can filter out the clicked item and render the updated list
    function isNotId(item) {
      return item._id !== _id;
    }
    // create a new updated list
    const updatedList = this.state.list.filter(isNotId);
    // assign the new updated list to the list using setState method
    this.setState({list:updatedList});
  }*/

  /*removeItem(_id){
    const isNotId = item =>item._id!==_id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({list:updatedList});
  }*/

  removeItem(_id){
    const updatedList = this.state.list.filter(item => item._id !== _id);
    this.setState({list:updatedList});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          {
            this.state.list.map(item => 
              <div key={item._id}>
              <h1>{item.title}</h1> by {item.name}
              on <span>{item.registered}</span> | {item.comments} comments 
              <button type="button" onClick={()=>this.removeItem(item._id)}>Remove</button>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
