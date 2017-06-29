import React, { Component } from "react";
import axios from 'axios';
//import "bootswatch/journal/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.css' 
import "./App.css";

import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

class RestaurantDisplay extends Component {
  constructor() {
    super();
    this.state = {
      r: null
    };
  }

  componentDidMount() {
    axios({
      method: 'post',
      url: 'http://localhost:8080/obtain-auth-token/',
      data: {
        username: 'admin',
        password: 'adminadmin',
      },
      contentType: "application/x-www-form-urlencoded",
      responseType:'json',

    }).then((response) => {
      //console.log(response);
      localStorage.token = response.data.token;
    })
    .catch((error) => {
      console.log(error);
    });

    const AuthStr = 'Token '.concat(localStorage.getItem('token'));
    const zip = this.props.zip;
    axios.get('http://localhost:8080/resta/api/restaurants/'+zip+'/',
    { headers: { Authorization: AuthStr } })
    .then(function(response) {
      //console.log(response.data);
      this.setState({r:response.data});
    }.bind(this)).catch((error) => {
      console.log(error);
    });
  }
  render() {
    const resta = this.state.r;
    const apiG = "AIzaSyAIz-VaDOxgWjJ1QoYA7Cha_1C88dgY68g";
    if (!resta) return <div>Loading</div>;
    return (
      <div>
      <h1>
      {this.state.r.name}
      </h1>
      <address>
      <p><b>Cuisine:</b> {this.state.r.cuisine}</p>
      <p><b>Address:</b> {this.state.r.address.street}</p>
      <p><b>Borough:</b> {this.state.r.borough}</p>
      </address>
      <iframe
      width="450"
      height="350"
      frameBorder="0" styles="border:0"
      src={"https://www.google.com/maps/embed/v1/place?key="+apiG+"&q="+ resta.name +' '+ resta.address.street +' '+ resta.borough} allowFullScreen>
      </iframe>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0,
      re: [],
    };
  }
  componentDidMount() {
    axios({
      method: 'post',
      url: 'http://localhost:8080/obtain-auth-token/',
      data: {
        username: 'admin',
        password: 'adminadmin',
      },
      contentType: "application/x-www-form-urlencoded",
      responseType:'json',

    }).then((response) => {
      //console.log(response);
      localStorage.token = response.data.token;
    })
    .catch((error) => {
      console.log(error);
    });

    const AuthStr = 'Token '.concat(localStorage.getItem('token'));
    axios.get('http://localhost:8080/resta/api/restaurants/',
    { headers: { Authorization: AuthStr } })
    .then(function(response) {
      //console.log(response.data);
      var places = response.data.map(function(item) {
        return {
          key: item.name,
          label: item.name
        };
      });
//console.log(places);
      this.setState({re:places});
    }.bind(this)).catch((error) => {
      console.log(error);
    });
  }

  render() {
    const activePlace = this.state.activePlace;
    const resta = this.state.re;
if (!resta[activePlace]) return <div>Loading</div>;
    return (
      <div>
      <Navbar>
      <Navbar.Header>
      <Navbar.Brand>
      React Simple Restaurant App
      </Navbar.Brand>
      <a href="https://mmaguero.github.io/MII-SSBW16-17/">Learn to build a modern Web System</a>
      </Navbar.Header>
      </Navbar>
      <Grid>
      <Row>
      <Col md={4} sm={4}>
      <h3>Select a place</h3>
      <Nav
      bsStyle="pills"
      stacked
      activeKey={activePlace}
      onSelect={index => {
        this.setState({ activePlace: index });
      }}
      >
{resta.map((place, index) => (
                  <NavItem key={index} eventKey={index}>{place.label}</NavItem>
                ))}
      </Nav>
      </Col>
      <Col md={8} sm={8}>
      <RestaurantDisplay key={activePlace} zip={resta[activePlace].key} />
      </Col>
      </Row>
      </Grid>
      </div>
    );
  }
}

export default App;
