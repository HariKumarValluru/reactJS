import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import list from './list.js';

// filter the results by search
function isSearched(searchTerm){
  return function(item){
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      list: list,
      searchTerm: ''
    };
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
  }

  removeItem(_id){
    const updatedList = this.state.list.filter(item => item._id !== _id);
    this.setState({list:updatedList});
  }


  // get input field value from search form
  searchValue(event){
    //console.log(event);
    this.setState({ searchTerm: event.target.value });
  }


  render() {
    const {list, searchTerm} = this.state; // ES6 Destructuring
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <br />
          <Search
            onChange={ this.searchValue }
            value={ searchTerm }
          />
          {
            list.filter(isSearched(searchTerm)).map(item => 
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

class Search extends Component{
  render(){
    const {onChange, value} = this.props;
    return (
        <form>
          <input
            type="text"
            onChange={ onChange }
            value={ value }
          />
        </form>
      );
  }
}

export default App;
