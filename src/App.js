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
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
console.log(url);

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
      result: null,
      searchTerm: DEFAULT_QUERY
    };
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
  }

  // set top stories
  setTopStories(result){
  	this.setState({result : result});
  }
  // fetch top stories
  fetchTopStories(searchTerm){
  	fetch(url).then(response => response.json())
  			.then(result => this.setTopStories(result))
  			.catch(e  => e);
  }

  // component did mount
  componentDidMount(){
  	this.fetchTopStories(this.state.searchTerm);
  }

  removeItem(id){
    const updatedList = this.state.result.hits.filter(item => item.objectID !== id);
    //this.setState({result:updatedList});
    // Object Assign operator
    //this.setState({ result: Object.assign({}, this.state.result, {hits:updatedList}) });
    // Spread Operator
    this.setState({ result: {...this.state.result, hits:updatedList} });
  }


  // get input field value from search form
  searchValue(event){
    //console.log(event);
    this.setState({ searchTerm: event.target.value });
  }


  render() {
    const {result, searchTerm} = this.state; // ES6 Destructuring
    if(!result) return null;
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
            list = {result.hits}
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
          <div key={item.objectID}>
          <h3><a href={item.url}>{item.title}</a></h3> by {item.author} | {item.comments} comments
          <Button type="button" className="btn btn-danger btn-xs" onClick={()=>removeItem(item.objectID)}>Remove</Button>
          </div>
        )
      }
      </div>
    )
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

export default App;
