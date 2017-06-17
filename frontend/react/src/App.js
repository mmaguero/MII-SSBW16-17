import React, { Component } from 'react';
//import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

import { Navbar, Nav, NavItem, FormGroup, FormControl, Button } from "react-bootstrap";

import axios from "axios";

function Fila (props) {
  return (
    <div><a href={props.url}>{props.name}</a></div>
  )
}

class SalidaListado extends Component {
  constructor() {
    super();
    this.state = {
      r: [],
    }
    }

  componentDidMount() {
    let _this = this;
    axios.get('https://api.github.com/users/mzabriskie/repos')
       .then(function(response) {
         _this.setState({r:response.data});
    });
  }


  render() {
    return (
      <div>
      { this.state.r.map(function(r) {
          return (
            <Fila name={r.name} url={r.html_url} />
          )
        })
      }
      </div>
    )
  }

}

class App extends Component {
  constructor() {
    super();
    this.state = {
      enlace: '',
    }
  }
  listar(event) {
    console.log('listar');
    this.setState({enlace:'listando'});
  }
  añadir(event) {
    console.log('añadir');
    this.setState({enlace:'añadiendo'});
  }

  render() {
    return (
      <div className="App">

      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Restaurantes</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem onClick={this.añadir.bind(this)}>Añadir</NavItem>
            <NavItem onClick={this.listar.bind(this)}>Listar</NavItem>

          </Nav>
          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>
            {' '}
            <Button type="submit">Submit</Button>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>


      {this.state.enlace === 'listando' &&
        <SalidaListado />
      }

      {this.state.enlace === 'añadiendo' &&
        <div>Añadiendo</div>
      }


      </div>
    );
  }
}


export default App;
