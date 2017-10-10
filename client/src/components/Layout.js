import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { getGrumbs } from '../actions/action'
import { getVotes } from '../actions/action'
import { searchGrumbs } from '../actions/action'
import { connect } from 'react-redux'
import { Menu, Input } from 'semantic-ui-react'
import Harold from './Harold'
import Trending from './Trending'
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
    const username = this.props.isAuthenticated ? localStorage.getItem('displayName') : "Guest, everything is read only."
    return (
      <div>
        <div className="topHeader">
          <div className="haroldHeader"></div>
          <div className="logoText">
            <h1 className="logoHeader">grumble</h1>
          </div>
          <div className="headline">
          </div>
        </div>
        <Menu>
            <Menu.Item as={Link} to="/" name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick && this.handleHomeClick}>Home</Menu.Item>
            <Menu.Item as={Link} to='/' name='Home' className="logo">About</Menu.Item>
            <Menu.Item><Input icon='search' placeholder='Search for grumbs or users...' name='search' onChange={this.handleChange} value={this.state.search} onClick={this.handleSubmit} /></Menu.Item>
            <Menu.Item position='right'>Logged in as {username}</Menu.Item>            
            <Menu.Item  as={Link} to="/Login" name='Login/Logout' active={activeItem === 'Login/Logout'} onClick={this.handleItemClick}>{loginStatus}</Menu.Item>
            <Menu.Item as={Link} to='/registration' name='SignUp' active={activeItem === 'SignUp'} onClick={this.handleItemClick}>Sign Up</Menu.Item>
            
        </Menu>
        <div className="flexer">
          <div>
            <Trending />
          </div>
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
