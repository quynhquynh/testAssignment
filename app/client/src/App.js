import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state= {
    data: []
  }
  componentDidMount = () =>{
    fetch('http://localhost:3001/orders', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'origins': '*'
      }
    }).then(res => {
      return res.json()
    }).then(resData => {
      console.log(JSON.stringify(resData));
      this.setState({data: resData})
    }).catch(e => console.log(e));
  }

  render() {
    return (
      <div className="App">
        <table>
          <tbody>
            {this.state.data ? this.state.data.map((element, index) => (
              <div key={index}>{JSON.stringify(element)}</div>
            )) : ''
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
