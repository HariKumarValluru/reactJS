import React, { Component } from 'react';
import logo from './logo.svg';
import list from './list.js';
import { Grid, Row, FormGroup } from 'react-bootstrap';

const DEFAULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
// Javascript concatination
//const url = PATH_BASE + PATH_SEARCH + "?" + PARAM_SEARCH + DEFAULT_QUERY;
// concatinate using ES6 template strings
const url = `${PATH_BASE}${PARAM_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
console.log(url);

// filter the results by search
function isSearched(searchTerm){
  return function(item){
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

// Creating a component in a different way or Functional Stateless components
const Button = ({onClick,children,className}) => <button onClick={onClick} className={className}>{children}</button>;
const Search = ({onChange, value, children}) => {

  return (
        <form>
        	<FormGroup>
	          <h1 style={{fontWeight: 'bold', color:'#0be6af'}}>{children}</h1>
	          <hr style={{ border: '2px solid #ccc'}} />
	          <div className="input-group">
		          <input
		          	className="form-control width100 searchForm"
		            type="text"
		            onChange={ onChange }
		            value={ value }
		          />
		          <span className="input-group-btn">
		          	<button
		          		className="btn btn-primary searchButton"
		          		type="submit"
		          		>
		          		Search
		          	</button>

		          </span>
	          </div>
          </FormGroup>
        </form>
      );
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
      <div>
          <Grid fluid>
          	<Row>
          		<div className="jumbotron text-center">
          			<Search
			            onChange={ this.searchValue }
			            value={ searchTerm }
			          >
			          NewsApp
			        </Search>
          		</div>
          	</Row>
          </Grid>
          <Table
            list = {list}
            searchTerm = {searchTerm}
            removeItem = {this.removeItem}
          />
      </div>
    );
  }
}

class Table extends Component{
  render(){
    const {list, searchTerm, removeItem} = this.props;
    return (
      <div className="col-sm-10 col-sm-offset-1">
      {
        list.filter(isSearched(searchTerm)).map(item => 
          <div key={item._id}>
          <h3>{item.title}</h3> by {item.name} | {item.comments} comments
          <Button type="button" className="btn btn-danger btn-xs" onClick={()=>removeItem(item._id)}>Remove</Button>
          </div>
        )
      }
      </div>
    )
  }
}

export default App;
