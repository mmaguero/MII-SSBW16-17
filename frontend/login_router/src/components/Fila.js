
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Detallar } from '../actions'

class Fila extends Component {

  doclick(event) {
    this.props.detallar(this.props.name)
  }

  render() {
    return (
      <div>
         <a href={this.props.url}>{this.props.name}</a>
         &nbsp;&nbsp;<span style={{color:'red'}} onClick={this.doclick.bind(this)}><b>X</b></span>
      </div>
    )
  }
}

// La parte del store que necesito en este componente
function mapStateToProps(state) {  // el state es el del componente principal (store)
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    detallar: (x) => {dispatch(Detallar(x))}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fila)
