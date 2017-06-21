import React, { Component,  PropTypes  } from 'react'
import { connect } from 'react-redux'

import { Navbar, Nav, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap'

import { IndexLinkContainer } from 'react-router-bootstrap'

import { Route, BrowserRouter as Router, Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import Lista from './Lista'
import Login from './Login'

import { DETALLAR } from '../actions'


// el del router
class Detallar extends Component {

  render() {
    return (
      <div>
      Detalle de <i>{this.props.match.params.id}</i> (desde router)
      </div>
    )
  }
}


class Añadir extends Component {
  render() {
    return (
      <div>
      Añadiendo
      </div>
    )
  }
}

class App extends Component {

  constructor(props, context) {
     super(props, context);
     context.router // will work
  //   this.state = {
  //   }
  }


// ask for `router` from context
contextTypes: {
    router: React.PropTypes.object
}

componentWillReceiveProps () {
  console.log('----')
  console.log(this.props)
  //this.context.router.push('/deta') no funciona
}
  render() {

    return (
      <Router>
      <div className="App">

      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"> Restaurantes </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>

             <IndexLinkContainer to="/añadir">
                <NavItem>Añadir</NavItem>
             </IndexLinkContainer>

             <IndexLinkContainer to="/listar">
                <NavItem>Listar</NavItem>
             </IndexLinkContainer>

             <IndexLinkContainer to="/login">
                <NavItem>Login</NavItem>
             </IndexLinkContainer>
             <NavItem>{this.props.usuario.name}</NavItem>


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

      {this.props.botón === DETALLAR &&
        <div>Detallando <b>{this.props.detalle}</b> (desde redux)
        </div>
      }
      <Route path="/login" component={Login} />
      <Route path="/listar" component={Lista} />
      <Route path="/añadir" component={Añadir} />
      <Route path="/detallar/:id" component={Detallar} />

      </div>
      </Router>
    )
  }
}



App.propTypes = {
    // botón: PropTypes.string.isRequired,
    // actions: PropTypes.object.isRequired
}

// La parte del store que necesito en este componente
function mapStateToProps(state, ownProps) {  // el state es el del componente principal (store)
  return {
    botón:  state.botonera.botón,
    detalle: state.nombre.nombre,
    usuario: state.usuario
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
