import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Menu, Input } from 'semantic-ui-react'


class Layout extends Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Menu>
            <Menu.Item className="logo">Grumble :-|</Menu.Item>
            <Menu.Item name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick}><Link to='/'>Home</Link></Menu.Item>
            <Menu.Item name='SignUp' active={activeItem === 'SignUp'} onClick={this.handleItemClick}><Link to='/registration'>Sign Up</Link></Menu.Item>
            <Menu.Item name='Login/Logout' active={activeItem === 'Login/Logout'} onClick={this.handleItemClick}><Link to='/Login'>Log in/Log out</Link></Menu.Item>
            <Menu.Item><Input icon='search' placeholder='Search...' /></Menu.Item>
        </Menu>
        {this.props.children}
        <footer>
          &copy; 2017 Grumbliees International
        </footer>
      </div>
    )
  }
}

export default Layout
