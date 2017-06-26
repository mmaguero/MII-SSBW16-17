import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Logear } from '../actions'

import axios from "axios"

class Login extends Component {

 constructor(props) {
    super(props);
    this.state = {
      name: '',
      pass: '',
      token: '',
      redirect: false,
    };
}

handleSubmit(evt) {
  this.setState ({redirect:true})
  this.props.logear(this.state.name, this.state.pass, 'el token')
  console.log('Login:')
  console.log(this.state.name)
  console.log(this.state.pass)
  console.log(this.state.redirect)

  /*axios.post(
    {
      method:'post',
      url:'http://localhost:8000/obtain-auth-token/',
      data:{
        username:this.state.name,
        password:this.state.password
      },
      responseType:'json'
    }
  )
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  })*/

  axios({
    method: 'post',
    url: 'http://localhost:8080/obtain-auth-token/',
    data: {
      username: this.state.name,
      password: this.state.pass,
    },
    contentType: "application/x-www-form-urlencoded",
    responseType:'json',

  }).then((response) => {
    console.log(response);
    localStorage.token = response.data.token;
  })
  .catch((error) => {
    console.log(error);
    alert("Ha ocurrido un error");
  });

}

updateNameValue(evt) {
  this.setState({ name: evt.target.value })
//console.log(evt.target.value)//
}

updatePassValue(evt) {
  this.setState({ pass: evt.target.value })
//console.log(evt.target.value)//
}


render () {
  const redirect = this.state.redirect
  if (redirect) {
    return (
        <Redirect to="/" />
    )
  }
  return (
    <div>
        <b>Login:</b><br />
        <input type="text" placeholder="username" value={this.state.name}
                onChange={evt => this.updateNameValue(evt)} /><br />
        <input type="password" placeholder="password" value={this.state.pass}
                onChange={evt => this.updatePassValue(evt)}  /><br />
        <input type="submit" value="Login"  onClick={this.handleSubmit.bind(this)} />
    </div>
   )
  }
}


function mapStateToProps(state) {  // el state es el del componente principal (store)
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logear: (name, pass, token) => {dispatch(Logear(name, pass, token))}
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
