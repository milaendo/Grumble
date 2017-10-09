import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { getGrumbs } from '../actions/action'
import { getVotes } from '../actions/action'
import { searchGrumbs } from '../actions/action'
import { connect } from 'react-redux'
import { Menu, Input } from 'semantic-ui-react'
import Harold from './Harold'
import { withRouter } from 'react-router-dom'



class Layout extends Component {
  state = {}


  componentWillMount() {
    getGrumbs()
    getVotes()
  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  
  handleHomeClick = (e) => {
    getGrumbs()
  }

  handleChange = (e) => {
    this.setState({
          [e.target.name]: e.target.value
      })
    }

  handleSubmit = (e) => {
    e.preventDefault()
    searchGrumbs(this.state.search)
    this.props.history.push('/')
  }


  render() {
    const { activeItem } = this.state
    const loginStatus = this.props.isAuthenticated ? "Logout" : "Login"
    return (
      <div>
        <Menu>
            <Menu.Item className="logo">Grumble :-|</Menu.Item>
            <Menu.Item as={Link} to="/" name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick, this.handleHomeClick}>Home</Menu.Item>
            <Menu.Item as={Link} to='/registration' name='SignUp' active={activeItem === 'SignUp'} onClick={this.handleItemClick}>Sign Up</Menu.Item>
            <Menu.Item as={Link} to="/Login" name='Login/Logout' active={activeItem === 'Login/Logout'} onClick={this.handleItemClick}>{loginStatus}</Menu.Item>
            <Menu.Item><Input icon='search' placeholder='Search...' name='search' onChange={this.handleChange} value={this.state.search} onClick={this.handleSubmit} /></Menu.Item>
        </Menu>
        <div className="flexer">
          <Harold />
          <div>{this.props.children}</div>
        </div>

        <footer>
          &copy; 2017 Grumbliees International
        </footer>
      </div>
    )
  }
}

function mapStateToProps(appState) {
  return {
    isAuthenticated: appState.auth.isAuthenticated
  }
}


export default withRouter(connect(mapStateToProps)(Layout))


