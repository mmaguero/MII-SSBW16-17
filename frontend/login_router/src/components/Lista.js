
import React, { Component } from 'react'

import axios from 'axios'

import Fila from './Fila'

class Lista extends Component {
  constructor() {
    super()
    this.state = {
      r: []
    }
  }

  componentDidMount() {
    let _this = this;
    const AuthStr = 'Token '.concat(localStorage.getItem('token'));
    axios.get('http://localhost:8080/resta/api/restaurants/',
    { headers: { Authorization: AuthStr } })
    .then(function(response) {
         _this.setState({r:response.data})
    }).catch((error) => {
            console.log('error ' + error);
          });
  }

  render() {
    return (
      <div>
      { this.state.r.map(function(r, index) {
          return (
            <Fila key={index} name={r.name} cuisine={r.cuisine} url={r.html_url}/>
          )
        })
      }
      </div>
    )
  }
}

export default Lista
