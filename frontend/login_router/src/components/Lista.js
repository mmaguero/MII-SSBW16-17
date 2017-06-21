
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
    axios.get('https://api.github.com/users/mzabriskie/repos')
       .then(function(response) {
         _this.setState({r:response.data})
    });
  }

  render() {
    return (
      <div>
      { this.state.r.map(function(r, index) {
          return (
            <Fila key={index} name={r.name} url={r.html_url}/>
          )
        })
      }
      </div>
    )
  }
}

export default Lista
