import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Menu, Input } from 'semantic-ui-react'
import Harold from './Harold'

class Layout extends Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Menu>
            <Menu.Item className="logo">Grumble :/</Menu.Item>
            <Menu.Item as={Link} to="/" name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick}>Home</Menu.Item>
            <Menu.Item as={Link} to='/registration' name='SignUp' active={activeItem === 'SignUp'} onClick={this.handleItemClick}>Sign Up</Menu.Item>
            <Menu.Item as={Link} to="/Login" name='Login/Logout' active={activeItem === 'Login/Logout'} onClick={this.handleItemClick}>Log in/Log out</Menu.Item>
            <Menu.Item><Input icon='search' placeholder='Search...' /></Menu.Item>
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

export default Layout
