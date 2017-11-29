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

// Creating a component in a different way
const Button = ({onClick,children}) => <button onClick={onClick}>{children}</button>;

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
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-intro">
          <br />
          <Search
            onChange={ this.searchValue }
            value={ searchTerm }
          >Search here </Search>

          <Table
            list = {list}
            searchTerm = {searchTerm}
            removeItem = {this.removeItem}
          />
          
        </div>
      </div>
    );
  }
}

class Search extends Component{
  render(){
    const {onChange, value, children} = this.props;
    return (
        <form>
          {children}
          <input
            type="text"
            onChange={ onChange }
            value={ value }
          />
        </form>
      );
  }
}

class Table extends Component{
  render(){
    const {list, searchTerm, removeItem} = this.props;
    return (
      <div>
      {
        list.filter(isSearched(searchTerm)).map(item => 
          <div key={item._id}>
          <h3>{item.title}</h3> by {item.name} | {item.comments} comments
          <Button type="button" onClick={()=>removeItem(item._id)}>Remove</Button>
          </div>
        )
      }
      </div>
    )
  }
}

export default App;
