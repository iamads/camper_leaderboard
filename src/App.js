import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import './blueprint.css';
import * as Blueprint from "@blueprintjs/core"

const alltime = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
const recent = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';

function TableRow(props) {
    const usernameStyle = {
        verticalAlign: 'inherit',
        marginLeft: '20px',
    }
    return(
        <tr>
            <td>{props.rank}</td>
            <td>
                <span><img src={props.img} height="30" width="30" /></span>
                <span style={usernameStyle}>{props.username}</span>
            </td>
            <td>{props.alltime}</td>
            <td>{props.recent}</td>
        </tr>
        )
}

class Table extends Component {
    fetch_leaderboard(type) {
        let that = this
         fetch(type)
            .then(function(response){
                return response.json()
            }).then(function(json){
                let arr = json.map(function(json, index){
                    return {rank: index+1, username: json.username, recent: json.recent, alltime: json.alltime, the_key: index+1, img: json.img }
                })
                that.setState({
                    list: arr,
                    url: type,
                })
            }).catch(function(ex){
                console.log('parsing failed', ex)
            })
    }
    constructor() {
        super();
        this.state = { 
            list: [] ,
            url: recent,
        };
        this.fetch_leaderboard(recent);
    }
    render() {
        const tableStyle = {
            width: "100%"
        }
        return (
                <div>
                    <table className="pt-table pt-interactive" style={tableStyle}>
                        <thead> 
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
                        </thead>
                        <tbody>
                            {
                                this.state.list.map(function(player_details){
                                    return <TableRow key={player_details.the_key} rank={player_details.rank} username={player_details.username} alltime={player_details.alltime} recent={player_details.recent} img={player_details.img}/>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                )
    }

}

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="pt-navbar pt-dark">
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">Camper LeaderBoard</div>
          </div>
          <div className="pt-navbar-group pt-align-right">
            <button className="pt-button pt-minimal pt-icon-home">Home</button>
            <button className="pt-button pt-minimal pt-icon-document">Files</button>
            <span className="pt-navbar-divider"></span>
            <button className="pt-button pt-minimal pt-icon-user"></button>
            <button className="pt-button pt-minimal pt-icon-notifications"></button>
            <button className="pt-button pt-minimal pt-icon-cog"></button>
          </div>
        </nav>
        <Table />
      </div>
    );
  }
}

export default App;
