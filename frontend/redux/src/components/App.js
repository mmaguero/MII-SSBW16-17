import React, { Component,  PropTypes  } from 'react'
import { connect } from 'react-redux'

import { Navbar, Nav, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import Lista from './Lista'

import { Listar, Añadir } from '../actions'
import { LISTAR, AÑADIR, DETALLAR } from '../actions'


class App extends Component {

  // constructor() {
  //   super()
  //   this.state = {
  //   }
  // }

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
            <NavItem onClick={this.props.añadir}>Añadir</NavItem>
            <NavItem onClick={this.props.listar}>Listar</NavItem>

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

      {this.props.botón === LISTAR &&
        <Lista />
      }

      {this.props.botón === AÑADIR &&
        <div>Añadiendo</div>
      }

      {this.props.botón === DETALLAR &&
        <div>Detallando <b>{this.props.detalle}</b> 
        </div>
      }


      </div>
    )
  }
}

App.propTypes = {
    // botón: PropTypes.string.isRequired,
    // actions: PropTypes.object.isRequired
}

// La parte del store que necesito en este componente
function mapStateToProps(state) {  // el state es el del componente principal (store)
  return {
    botón:  state.botonera.botón,
    detalle: state.nombre.nombre
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listar: () => {dispatch(Listar())},
    añadir: () => {dispatch(Añadir())}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
