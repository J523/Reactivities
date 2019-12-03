  import React ,{Component} from 'react';
  import './App.css';
  import axios from 'axios';
  import {Header,Icon,List,Image} from 'semantic-ui-react';

  class App extends Component <{},{values :any[],names :string[]}>{
  /**
   *
   */
  constructor(props:any) {
    super(props);
  this.state = {
  values : [{id:1 , name : "Value101" },{id:2 , name : "Value102" },{id:3 , name : "Value103" }],
  names : ["Vidisha","Bhargavi","Isabelle"]
  } 
  }

  componentDidMount(){
  axios.get('http://localhost:5000/api/values').then((response)=>{
    
  this.setState({values:response.data});
  })
  }

  render(){
      return (
        <div>
          <Header as='h2' icon textAlign='center'>
          <Icon name='users' circular />
          <Header.Content>Reactivities</Header.Content>
          </Header>
          <List>
          {this.state.values.map((value)=>(<List.Item key= {value.id}>{value.name}</List.Item>))}
          </List>       
        </div>
    );
  }

  }

  export default App;
