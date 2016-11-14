import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';

class Table extends Component {
    fetch_recent_leaderboard() {
        fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
            .then(function(response){
                return response.json()
            }).then(function(json){
                console.log('parsed json', json)
            }).catch(function(ex){
                console.log('parsing failed', ex)
            })
    }
    fetch_alltime_leaderboard() {
        fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
            .then(function(response){
                return response.json()
            }).then(function(json){
                console.log('parsed json', json)
            }).catch(function(ex){
                console.log('parsing failed', ex)
            })
    }
    constructor() {
        super();
        this.state = { 
            list: [1,2,3,4]
        }
        this.fetch_recent_leaderboard()
    }
    render() {
        return (
                <div>
                    <table>
                        <tr>LeaderBoard</tr>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Camper Name
                            </th>
                            <th>
                                Points in past 30 days
                            </th>
                            <th>
                                All time points
                            </th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                        </tr>
                    </table>
                </div>
                )
    }

}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Table />
      </div>
    );
  }
}

export default App;
